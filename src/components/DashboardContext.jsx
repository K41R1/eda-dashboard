import React from 'react';
import crossfilter from 'crossfilter2';
import DataContext from '../services/DataContext';
import { api as SolrApi} from '../services/api/CollectionApi';
import { api as ESApi } from '../services/api/IndexApi';
import SolrDebugBar from './Debug/SolrDebugBar';
import ESDebugBar from './Debug/ESDebugBar';

export default class DashboardContext extends React.Component {

    ndx;
    cf = [];
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            cf: []
        }    
    }

    async recursiveScroll(id) {
        return new Promise((resolve) => {
            ESApi.scroll(id).then(d => {
                if (d.length !== 0) {
                    this.cf.push(d)       
                    resolve("loaded")   
                }else {
                    resolve()
                }
            }) 
        })
    }

    async loadFirstScroll(debug = false) {
        return new Promise((resolve) => {
            let scrollId = null;
            ESApi.findAll().then((response) => {
                this.cf.push(response.data)
                this.info = response.info
                scrollId = response.scrollId
                
                resolve(scrollId);
            })  
        })
    }

    async loadElasticSearchIndex(debug = false) {
        let scrollId = await this.loadFirstScroll()
        await this.recursiveScroll(scrollId)
    }

    async loadFirstPage() {
        return new Promise((resolve) => {
            let cursor = null;
            SolrApi.findAll(10000).then(d => {
                this.info = d.responseHeader;
                cursor = d.nextCursorMark
                this.cf.push(d.response.docs)
                resolve(cursor)
            })
        })
    }

    async paginateDocs(cursor) {
        return new Promise((resolve) => {
            SolrApi.paginate(cursor).then(d => {
                if(d.response.docs.length === 0) {
                    resolve("loaded")
                }else {
                    this.cf.push(d.response.docs)
                    resolve(this.paginateDocs(cursor))
                }
            })
        })
    }

    async loadSolrCollection() {
        let cursor = await this.loadFirstPage()
        await this.paginateDocs(cursor)
    }

    async componentDidMount() {   
        let { source } = this.props;
        switch (source) {
            case 'solr':
                SolrApi.findAll(100000).then(d => {
                    this.info = d.responseHeader;
                    this.ndx = crossfilter(d.response.docs)
                    this.setState({loaded: true})
                })
                break;
            case 'elasticsearch':
                await this.loadElasticSearchIndex()
                this.cf = this.cf.flat()
                this.ndx = crossfilter(this.cf)
                this.setState({loaded: true})
                break;
            default:
                break;
        }
    }

    render() {    
        let source = this.props.source;
        let debugBar = null
        if (source === 'solr') {
            debugBar = <SolrDebugBar info={this.info} ></SolrDebugBar>
        } else {
            debugBar = <ESDebugBar info={this.info}></ESDebugBar>
        }
        return (<DataContext.Provider value={{ndx: this.ndx}}>
            <div>
                {this.props.children}
            </div>
            {debugBar}
        </DataContext.Provider>)
    }
}
import React from 'react';
import StickyFooter from 'react-sticky-footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListGroup } from 'react-bootstrap';
import  { faClock, faDatabase, faCubes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/solr.png';

export default class SolrDebugBar extends React.Component {

    render() {
        let { info } = this.props;

        if (info) {
            return (
                <StickyFooter
                    bottomThreshold={5}
                    stickyStyles={{
                    backgroundColor: 'transparent',
                    padding: '2px',
                    width: '100%'
                }}>
                    <ListGroup horizontal>
                        <ListGroup.Item>
                            <img src={logo} width='25px' height='25px' alt='Solr Logo'></img>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Time <FontAwesomeIcon icon={faClock} />: {info.QTime} ms
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Format <FontAwesomeIcon icon={faDatabase} />: {info.params.wt}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Zookeeper Enabled <FontAwesomeIcon icon={faCubes} />: {info.zkConnected.toString()}    
                        </ListGroup.Item>
                    </ListGroup>
                </StickyFooter>)
        }else {
            return (<StickyFooter  bottomThreshold={5}
                stickyStyles={{
                backgroundColor: '#0275d8',
                padding: '5px',
                width: '100%'
            }}>
            </StickyFooter>)
        }

    }
}
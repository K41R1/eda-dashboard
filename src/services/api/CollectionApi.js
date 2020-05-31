import config from '../../config.json'
import SolrClient from "../SolrClient";

class CollectionApi {
    
    client;
    collection;

    constructor() {
        this.client = new SolrClient(config.solr.url)   
        this.collection = config.solr.collection
    }

    async findAll(rows = 10000) {
        let params = {
            q: "*:*",
            rows: rows,
            cursorMark: '*',
            sort: 'id desc'
        }
        return await this.client.queryWithParams(this.collection, params)
    }

    async paginate(cursor, rows = 10000) {

        let params = {
            q: '*:*',
            rows: rows,
            cursorMark: cursor,
            sort: 'id desc'
        }

        return await this.client.queryWithParams(this.collection, params)
    }

    async findByField(field, value, rows = 100) {
        let params = {
            q: field + ":" + value,
            rows: rows
        }
        return await this.client.queryWithParams(this.collection, params)
    }

    async withFacet(field) {
        let params = {
            'q': "*:*",
            'facet.field': field,
            'facet': 'on'
        }
        return await this.client.queryWithParams(this.collection, params)
    }
}

const api = new CollectionApi()

export {
    CollectionApi,
    api
}
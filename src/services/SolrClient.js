import querystring from 'querystring'

export default class SolrClient {
    
    solrUrl = '';

    constructor(url) {
        this.solrUrl = url
    }

    async queryWithParams(collection, params) {
        // return format should be explicitly set to json
        params.wt = "json"
        
        let query = querystring.stringify(params)
        // eslint-disable-next-line
        this.solrUrl = this.solrUrl + "/" + collection + "/select" +  "?" + query 
        
        return await fetch(this.solrUrl).then(response => response.json());
    }
}
import { Client } from 'elasticsearch';

export default class ElasticSearchClient {

    constructor(nodes) {
        this.client = new Client({
            hosts: nodes
        });
    }

    async search(index) {
        return await this.client.search({
            index: index,
            size: 100000,
            scroll: '1m',
            body: {
                query: {
                    "match_all": {}
                }
            }
        })
    }

    async scroll(id) {
        return await this.client.scroll({
            scrollId: id,
            scroll: '1m'
        })
    }
}

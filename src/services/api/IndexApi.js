import config from '../../config.json';
import ElasticSearchClient from '../ElasticSearchClient';

export default class IndexApi {
 
    constructor() {
        
        this.client = new ElasticSearchClient(config.elasticsearch.nodes)
        this.index = config.elasticsearch.index
    }

    async findAll(body = null) {
        return await this.client.search(this.index).then(response => {
            let xs = response.hits.hits.map( x => x._source )
            return {
                data: xs,
                scrollId: response._scroll_id,
                info: {
                    QTime: response.took,
                    maxScore: response.hits.max_score,
                    shards: response._shards
                }
            }
        });
    }

    async scroll(id) {
        return await this.client.scroll(id).then(response => {
          let xs = response.hits.hits.map(x => x._source)
          return Promise.resolve(xs) 
        })
    }
}

const api = new IndexApi();

export {
    api,
    IndexApi
}
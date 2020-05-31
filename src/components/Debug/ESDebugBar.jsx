import React from 'react';
import StickyFooter from 'react-sticky-footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListGroup, Badge } from 'react-bootstrap';
import  { faClock, faFolder, faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/elasticsearch.png';

export default class ESDebugBar extends React.Component {

    render() {
        let { info } = this.props;
        
        if (info) {    
            return (<StickyFooter
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
                        Score <FontAwesomeIcon icon={faSortNumericUpAlt} />: {info.maxScore}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Shards <FontAwesomeIcon icon={faFolder} />: {'  '}
                        <Badge pill variant="success">
                            successful { info.shards.successful }
                        </Badge>{' '}
                        <Badge pill variant="warning">
                            skipped { info.shards.skipped }
                        </Badge>{' '}
                        <Badge pill variant="danger">
                            failed { info.shards.failed }
                        </Badge>{' '}    
                    </ListGroup.Item>
                </ListGroup>
            </StickyFooter>)
        } else { return (<StickyFooter
            bottomThreshold={10}
            stickyStyles={{
            backgroundColor: 'transparent',
            padding: '2px',
            width: '100%'
        }}>

        </StickyFooter>) }
    }
}
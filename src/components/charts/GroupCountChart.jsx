import React from 'react';
import { VictoryPie, VictoryTheme } from 'victory'
import { Spinner, Card, Form } from 'react-bootstrap';
import DataContext from '../../services/DataContext'

export default class GroupCountChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {aggField: 'gender'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState(
            { aggField: event.target.value }
        )
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (<DataContext.Consumer>
            {
                ({ndx}) => {
                    if (ndx) {
                                                
                        let agg = this.state.aggField;                        
                        let genderDimension= ndx.dimension((d) => d[agg]); 
                        let data = genderDimension.group().all()
                        let labels = []
                        data.forEach((item) => {
                          labels.push(item.key)
                            
                        })
                        return (<Card >
                            <Card.Header>
                                <Form>
                                    <Form.Group controlId="form.groupby">
                                        <Form.Label>Select Aggregation Field</Form.Label>
                                        <Form.Control as="select" value={this.state.aggField} onChange={this.handleChange}>
                                            <option value="gender">Gender</option>
                                            <option value="form">Form</option>
                                            <option value="sector">Sector</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="text-center">Partition By {agg.toUpperCase()}</Card.Title>
                                <VictoryPie 
                                    data={data} 
                                    x={'key'} 
                                    y={'value'}
                                    theme={VictoryTheme.material}
                                    labels={labels}
                                />
                            </Card.Body>
                        </Card>)
                    }else {
                        return (<Card style={{width: 400, height: 400}}>
                            <Card.Body>        
                                <div className="d-flex justify-content-center">
                                    <Spinner animation="grow" variant="primary" ></Spinner>
                                </div>
                            </Card.Body>
                        </Card>)
                    }
                }
            }
        </DataContext.Consumer>)   
    }
}
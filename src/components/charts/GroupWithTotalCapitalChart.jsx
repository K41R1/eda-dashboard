import React from 'react';
import { VictoryPie, VictoryTheme } from 'victory'
import DataContext from '../../services/DataContext';
import { Spinner, Card, Form } from 'react-bootstrap';

export default class GroupWithTotalCapitalChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = { aggField: 'form' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            aggField: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
    }



    render() {
        return (<DataContext.Consumer>
            {
                ({ndx}) => {
                    if(ndx) {
                        let agg = this.state.aggField
                        let formDimension = ndx.dimension(d => d[agg])
                        let groups = formDimension.group().reduceSum(d => d.capital)
                        let data = groups.all()
                        return (<Card>
                            <Card.Header>
                            <Form>
                                <Form.Group controlId="form.groupby.totalcapital">
                                        <Form.Label>Select Aggregation Field</Form.Label>
                                        <Form.Control as="select" value={this.state.aggField} onChange={this.handleChange}>
                                            <option value="governorate">Governorate</option>
                                            <option value="form">Form</option>
                                            <option value="sector">Sector</option>
                                            <option value="gender">Gender</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="text-center"> Partition By {agg.toLocaleUpperCase()} With Total Capital </Card.Title>
                                <VictoryPie 
                                    x={'key'} 
                                    y={'value'} 
                                    data={data} 
                                    theme={VictoryTheme.material}
                                    padAngle={2}
                                    innerRadius={100}
                                />
                            </Card.Body>
                        </Card>)  
                    }else {
                        return (<div className="d-flex justify-content-center">
                            <Spinner animation="grow" variant="primary" ></Spinner>
                        </div>)
                    }
                }
            }
        </DataContext.Consumer>)
    }   
}
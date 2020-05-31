import React from 'react';
import crossfilter from 'crossfilter2';
import { Col, Row, Table } from 'react-bootstrap';
import Tunisia from './Map/Tunisia';
import DataContext from '../services/DataContext';

export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            governorate: 'Tunis'
        }
    }

    handlePathClick(event) {
        let title = event.target.getAttribute('title');
                
        this.setState({
            governorate: title
        })        
    }

    render() {
        return (<DataContext.Consumer>
            {
                ({ndx}) => {
                    if (ndx) {
                        let { governorate } = this.state
                        let dim = ndx.dimension(d => d.governorate)                            
                            dim.filter(governorate)
                        let top = dim.top(5)
                        let xs = crossfilter(dim.top(Infinity))
                        let formDim = xs.dimension(d => d.form)
                        let sectorDim = xs.dimension(d => d.sector)
                        let capitalForm = formDim.group().reduceSum(d => d.capital)
                        let capitalSector = sectorDim.group().reduceSum(d => d.capital)
                        dim.filterAll()
                        
                        return (<Row className="mt-2 mb-2">
                            <Col md={4}>
                                <Tunisia handler={this.handlePathClick.bind(this)} />
                            </Col>
                            <Col md={8}>
                                <h3 className="text-center" >
                                    Governorate: { governorate }
                                </h3>
                                <Row>
                                    <Col md={12}>
                                        <h5 className="text-center"> Top 5 Companies </h5>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Creation Date</th>
                                                    <th>Capital</th>
                                                    <th>Form</th>
                                                    <th>Sector</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    top.map((row, index) => {
                                                    return (<tr key={index}>
                                                        <td>{ row.creation }</td>
                                                        <td>{ row.capital } TND</td>
                                                        <td>{ row.form }</td>
                                                        <td>{ row.sector }</td>
                                                    </tr>)  
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <h5 className="text-center"> Companies Form With Total Capital </h5>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Form</th>
                                                    <th>Total Capital</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    capitalForm.all().map((row, index) => {
                                                    return (<tr key={index}>
                                                        <td>{ row.key }</td>
                                                        <td>{ row.value } TND</td>
                                                    </tr>)  
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col md={6}>
                                        <h5 className="text-center"> Companies Sector With Total Capital </h5>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Sector</th>
                                                    <th>Total Capital</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    capitalSector.all().map((row, index) => {
                                                    return (<tr key={index}>
                                                        <td>{ row.key }</td>
                                                        <td>{ row.value } TND</td>
                                                    </tr>)  
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>)
                    }else {
                        return (<div>
                            wait loading data
                        </div>)
                    }
                }
            }
        </DataContext.Consumer>) 
    }
}
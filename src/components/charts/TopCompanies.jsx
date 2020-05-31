import React from 'react';
import { Table } from 'react-bootstrap'
import DataContext from '../../services/DataContext'

export default class TopCompanies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dimension: 'governorate',
            mesure: 'NO'
        }
    }

    render() {
        return (<DataContext.Consumer>
            {
                ({ndx}) => {
                    if (ndx) {
                        let dim = ndx.dimension(d => d[this.state.dimension])
                        let group = dim.group()
                        let data = group.top(10)
                        return (<div>
                            <div className="text-center">Top 5 Governorates</div>
                            <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>{this.state.dimension}</th>
                                    <th># Companies</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => {
                                      return (<tr key={index}>
                                            <td>{item.key}</td>
                                            <td>{item.value}</td>
                                        </tr>)  
                                    })
                                }
                            </tbody>
                          </Table>
                        </div>)
                    }else {
                        return (<div>spinner here</div>)
                    }
                }
            }
        </DataContext.Consumer>)   
    }
}
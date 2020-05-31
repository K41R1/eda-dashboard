import React from 'react'
import {
    Switch,
    Route
  } from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap'
import DashboardContext from './DashboardContext'
import GroupCountChart from './charts/GroupCountChart'
import TopCompanies from './charts/TopCompanies'
import GroupWithTotalCapitalChart from './charts/GroupWithTotalCapitalChart'
import Map from './Map'


export default class Dashboard extends React.Component {

    render() {
        return (<Container fluid margin={{top: 10}} padding={{top: 10}}>
            <DashboardContext source={'elasticsearch'}>
                <Switch>
                    <Route exact path="/">
                    <Row>
                        <Col md={4} className="mt-2 mb-2">
                            <GroupCountChart />
                        </Col>
                        <Col md={4} className="mt-2 mb-2" >
                            <GroupWithTotalCapitalChart />
                        </Col>

                        <Col md={4} className="mt-2 mb-2" >
                            <div> Another Chart Here</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} className="mt-2 mb-2" >
                            <TopCompanies />
                        </Col>
                    </Row>
                    </Route>
                    <Route path="/map">
                        <Map />
                    </Route>
                </Switch>
            </DashboardContext>
        </Container>)
    }

}
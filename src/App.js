import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import Dashboard from './components/Dashboard';

export default class App extends React.Component {

  render() {
    return (<div className="App">
      <Router>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/map">
              <Nav.Link>Map</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
        <Dashboard />
      </Router>
    </div>)   
  }
}

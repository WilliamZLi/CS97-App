import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateObj from "./components/create-obj.component";
import ListObj from "./components/list-obj.component";
import Logout from "./components/logout.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import NotFound from "./components/notfound.component";
import Home from "./components/home.component";
import Search from "./components/search.component";   // import Search
axios.defaults.withCredentials = true;

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-obj"} className="nav-link">
                  Post
                </Link>
              </Nav>
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/list-obj"} className="nav-link">
                    Gallery
                </Link>
                </Nav>
              </Nav>
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/search"} className="nav-link">
                    Search
                </Link>
                </Nav>
              </Nav>

              <Nav>
                <Link to={"/logout"} className="nav-link">
                  Logout
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path="/create-obj" component={CreateObj} />
                <Route exact path="/list-obj" component={ListObj} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/search" component={Search} />
                <Route path="" component={NotFound} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;
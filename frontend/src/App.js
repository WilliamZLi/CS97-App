import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateObj from "./components/create-obj.component";
import EditObj from "./components/edit-obj.component";
import ObjList from "./components/obj-list.component";
import Register from "./components/register.component";
import Login from "./components/login.component";

function  App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                React MERN Stack App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-obj"} className="nav-link">
                  Create Object
                </Link>
              </Nav>

              { <Nav>
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </Nav> }

              <Nav>
                <Link to={"/obj-list"} className="nav-link">
                  Object List
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
                <Route exact path='/' component={Register} />
                <Route path="/create-obj" component={CreateObj} />
                <Route path="/edit-obj/:id" component={EditObj} />
                <Route path="/obj-list" component={ObjList} />
                <Route path="/login" component={Login} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;
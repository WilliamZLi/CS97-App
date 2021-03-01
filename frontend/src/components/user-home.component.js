import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class userHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="userScreen">
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

                <Nav>
                  <Link to={"/myProfile"} className="nav-link">
                    Gallery
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/search"} className="nav-link">
                    Search
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/friends"} className="nav-link">
                    Friends
                  </Link>
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
      </div>
    );
  }
}

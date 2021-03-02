import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const Header = () => (
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
            <Link to={"/list-obj"} className="nav-link">
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
);

export default Header;

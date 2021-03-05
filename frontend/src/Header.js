import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./Header.css";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt, FaHome, FaUserFriends, FaSearch } from "react-icons/fa";
import { SiAddthis } from "react-icons/si";

const Header = () => (
  <header className="App-header">
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to={"/"} className="nav-link">
            <FaHome className="nav__icon" />
            Home
          </Link>
        </Navbar.Brand>

        <Nav className="justify-content-end">
          <Nav>
            <Link to={"/create-obj"} className="nav-link">
              <SiAddthis className="nav__icon" />
              Post
            </Link>
          </Nav>

          <Nav>
            <Link to={"/myProfile"} className="nav-link">
              <CgProfile className="nav__icon" />
              Profile
            </Link>
          </Nav>

          <Nav>
            <Link to={"/search"} className="nav-link">
              <FaSearch className="nav__icon" />
              Search
            </Link>
          </Nav>

          <Nav>
            <Link to={"/friends"} className="nav-link">
              <FaUserFriends className="nav__icon" />
              Friends
            </Link>
          </Nav>

          <Nav>
            <Link to={"/logout"} className="nav-link">
              <FaSignOutAlt className="nav__icon" />
              Logout
            </Link>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  </header>
);

export default Header;

import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import MainPage from "./MainDisplay/MainPage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateObj from "./components/create-obj.component";
import ListObj from "./components/list-obj.component";
import Logout from "./components/logout.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import NotFound from "./components/notfound.component";
import Home from "./components/home.component";
axios.defaults.withCredentials = true;

function App() {
  return (<Router>
    <MainPage/>
  </Router>);
}

export default App;
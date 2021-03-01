import React, { Component } from "react";
import "./login.css";

import { IoMdArrowRoundBack } from "react-icons/io";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
axios.defaults.withCredentials = true;

export default class Register extends Component {
  constructor(props) {
    super(props);

    // Setting up functions - set 'this' context to this class
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitBack = this.onSubmitBack.bind(this);

    // Setting up state
    this.state = {
      name: "",
      password: "",
      redirect: null,
    };
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmitBack(e) {
    e.preventDefault();
    this.setState({ redirect: "/" });
  }

  onSubmit(e) {
    e.preventDefault();

    const objObject = {
      // user object
      name: this.state.name,
      password: this.state.password,
    };
    if (objObject.name === "" || objObject.password === "") {
      // prevent submit if blank form
      alert("Cannot be an empty form");
      return;
    }
    axios
      .post("http://localhost:5000/auth/regis", objObject)
      .then((res) => {
        // only remove if complete successfully
        console.log(res);
        this.setState({ name: "", password: "" });
        this.setState({ redirect: "/login" });
      })
      .catch((err) => {
        // if error, notify user
        alert(err.response.data.message);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="form-wrapper">
        <div className="header">
          <Form onSubmit={this.onSubmitBack}>
            <Button block="block" type="submit" className="backButton">
              <IoMdArrowRoundBack className="arrowIcon" />
            </Button>
          </Form>
        </div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group controlId="Name">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </Form.Group>

          <Button size="lg" block="block" type="submit" className="button">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

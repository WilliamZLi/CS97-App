import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./create-obj.css";

import Header from "../Header";
import { MdTextsms, MdPhoto } from "react-icons/md";
axios.defaults.withCredentials = true;

export default class CreateObj extends Component {
  constructor(props) {
    super(props);

    // Setting up functions - set 'this' context to this class
    this.onChangeObjName = this.onChangeObjName.bind(this);
    this.onChangeObjBody = this.onChangeObjBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      loading: true,
      logged: false,
      name: "",
      body: "",
      file: null,
      button: true,
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/auth/logged")
      .then((arr) => {
        // console.log(arr);
        this.setState({ logged: true, loading: false });
      })
      .catch((err) => {
        // console.log(err);
        this.setState({ loading: false });
      });
  }

  onChangeObjName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeObjBody(e) {
    // console.log(e);
    this.setState({ file: e.target.files[0], body: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.name === "" || this.state.body === "") {
      alert("Cannot submit an empty form");
      return;
    }
    this.setState({ button: false });

    // console.log(this.state.file);
    const formData = new FormData();
    formData.append("photo", this.state.file);
    formData.append("caption", this.state.name);
    // console.log(formData);

    axios
      .post("http://localhost:5000/objs/create-obj", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        // console.log(res);
        this.setState({ name: "", body: "", button: true, file: null });
      })
      .catch((err) => {
        this.setState({ button: true });
        // console.log(err);
        alert(err.response.data.message);
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (!this.state.logged) {
      return <Redirect to="/" />;
    }
    return (
      <div className="user-home">
        <Header />
        <div className="user-container">
          <div className="user-contents post">
            <Form onSubmit={this.onSubmit} encType="multipart/form-data">
              <Form.Group controlId="Name">
                <Form.Label>
                  {" "}
                  Caption
                  <MdTextsms className="caption-icon" />
                </Form.Label>
                <Form.Control
                  className="post-caption-box"
                  type="text"
                  as="textarea"
                  rows="3"
                  value={this.state.name}
                  onChange={this.onChangeObjName}
                />
              </Form.Group>

              <Form.Group controlId="photo">
                <Form.Label>
                  Photo <MdPhoto />
                </Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  value={this.state.body}
                  onChange={this.onChangeObjBody}
                />
              </Form.Group>

              <Button
                className="post__Button"
                size="sm"
                type="submit"
                disabled={this.state.disabled}
              >
                {this.state.button ? "Post" : "Submitting..."}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

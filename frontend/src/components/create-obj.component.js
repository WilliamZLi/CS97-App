import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import Header from "../Header";
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
      name: "",
      body: "",
      file: null,
      button: true,
    };
  }

  onChangeObjName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeObjBody(e) {
    console.log(e);
    this.setState({ file: e.target.files[0], body: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.name === "" || this.state.body === "") {
      alert("Cannot submit an empty form");
      return;
    }
    this.setState({ button: false });

    console.log(this.state.file);
    const formData = new FormData();
    formData.append("photo", this.state.file);
    formData.append("caption", this.state.name);
    console.log(formData);

    axios
      .post("http://localhost:5000/objs/create-obj", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        this.setState({ name: "", body: "", button: true, file: null });
      })
      .catch((err) => {
        this.setState({ button: true });
        console.log(err);
        alert(err.response.data.message);
      });
  }

  render() {
    return (
      <div className="user-home">
        <Header />
        <div className="user-container">
          <div className="user-contents">
            <Form onSubmit={this.onSubmit} encType="multipart/form-data">
              <Form.Group controlId="Name">
                <Form.Label>Caption</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.name}
                  onChange={this.onChangeObjName}
                />
              </Form.Group>

              <Form.Group controlId="photo">
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  value={this.state.body}
                  onChange={this.onChangeObjBody}
                />
              </Form.Group>

              <Button
                variant="danger"
                size="lg"
                block="block"
                type="submit"
                id="button"
              >
                {this.state.button ? "Upload" : "Submitting..."}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

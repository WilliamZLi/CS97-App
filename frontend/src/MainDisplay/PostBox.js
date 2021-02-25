import React, { Component } from "react";
import "./PostBox.css"
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';
import { Avatar, Button} from "@material-ui/core";
import userPic from "../images/profilePic.png";
import axios from 'axios';
axios.defaults.withCredentials = true

export default class PostBox extends Component {

  constructor(props) {
    super(props)

    // Setting up functions - set 'this' context to this class
    this.onChangeObjName = this.onChangeObjName.bind(this);
    this.onChangeObjBody = this.onChangeObjBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      name: "",
      body: "",
      file: null,
      button: true
    }
  }

  onChangeObjName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeObjBody(e) {
    console.log(e)
    this.setState({ file: e.target.files[0], body: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.state.name === "" || this.state.body === "") {
      alert('Cannot submit an empty form')
      return;
    }
    this.setState({ button: false })

    console.log(this.state.file)
    const formData = new FormData();
    formData.append('photo', this.state.file);
    formData.append('caption', this.state.name);
    console.log(formData)

    axios.post('http://localhost:5000/objs/create-obj', formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(res => {
        console.log(res)
        this.setState({ name: "", body: "", button: true, file: null })
      })
      .catch(err => {
        this.setState({ button: true})
        console.log(err)
        alert(err.response.data.message)
      })
  }

  render() {
    return (<div className="postBox">
      <Form onSubmit={this.onSubmit} encType="multipart/form-data">
        <form>
            <Form.Group controlId="Name">
                <div className="postBox__input">
                    <Avatar src={userPic}/>
                    {/* <input placeholder="What's New..." type="text" /> */}
                    {/* <input placeholder="Enter image URL" type="text" /> */}
                <Form.Control input placeholder="What's New..." type="text" value={this.state.name} onChange={this.onChangeObjName} />
                </div>
            </Form.Group>

            <Form.Group controlId="photo">
                <div className="postBox_input">
                
                <Form.Control type="file" name="photo" value={this.state.body} onChange={this.onChangeObjBody} />
                </div>
            </Form.Group>

            <Button className="postBox__postButton" variant="danger" size="lg" block="block" type="submit" id="button">
                {this.state.button ? 'Upload' : 'Submitting...'}
            </Button>
        </form>
      </Form>
    </div>);
  }
}

//export default PostBox

import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateObj extends Component {

  constructor(props) {
    super(props)

    // Setting up functions - set 'this' context to this class
    this.onChangeObjName = this.onChangeObjName.bind(this);
    this.onChangeObjBody = this.onChangeObjBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      body: ''
    }
  }

  onChangeObjName(e) {
    this.setState({name: e.target.value})
  }

  onChangeObjBody(e) {
    this.setState({body: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const objObject = {
      name: this.state.name,
      body: this.state.body
    };
    if (objObject.name === "" || objObject.body == "") {
      alert('Cannot submit an empty form')
    }
    axios.post('http://localhost:5000/objs/create-obj', objObject)
      .then(res => console.log(res.data));
    this.setState({name: '', body: ''})
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeObjName}/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Body</Form.Label>
          <Form.Control type="text" value={this.state.body} onChange={this.onChangeObjBody}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Object
        </Button>
      </Form>
    </div>);
  }
}
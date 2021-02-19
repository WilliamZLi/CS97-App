import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Redirect } from "react-router-dom";
axios.defaults.withCredentials = true;

export default class ObjList extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault()
    axios.get('http://localhost:5000/auth/logout')
      .then(res => { // only remove if complete successfully
          console.log(res)
          this.setState({name: '', password: ''})
          //this.setState({redirect: '/create-obj'}) 
        })
      .catch(err => { // if error, notify user
          console.log(err)
          alert(JSON.stringify(err))
        })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Button variant="danger" size="lg" block="block" type="submit">
          Logout
        </Button>
      </Form>
    </div>);
  }
}
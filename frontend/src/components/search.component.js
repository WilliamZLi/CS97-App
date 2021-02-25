import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class Search extends Component {
  constructor(props) {
    super(props)
    
    // Set up functions - set 'this' context to this class
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      query: '',
      capture: null
    }
  }

  onChangeQuery(e) {
    this.setState({query: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const searchString =  {
      query: this.state.query
    }

    if (searchString === "") {
      alert('Cannot be an empty form')
      return;
    }
    axios.post('http://localhost:5000/search', searchString)
    .then(res => { // only remove if complete successfully
        console.log(res.data)
        this.setState({query: '', capture: res.data})
        console.log(this.state.capture)
      })
    .catch(err => { // if error, notify user
        console.log(err)
        this.setState({query: ''})
        alert(err.response.data.message)
      })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Search">
          <Form.Label>Search</Form.Label>
          <Form.Control type="text" placeholder="Enter user name" 
                        value={this.state.query} onChange={this.onChangeQuery}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Search
        </Button>
      </Form>
    </div>);
  }
}

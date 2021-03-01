import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true

export default class ListObj extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
    }
  }

  componentDidMount() {
    axios.post('http://localhost:5000/log')
      .then(arr => {
        console.log(arr)
        this.setState({ redirect: arr.data.id })
      })

  }


  render() {
    if (this.state.redirect === null) {
      return (<div className="text-center">
        <p>Loading</p>
      </div>)
    }
    else {
      return <Redirect to={"/profile/"+this.state.redirect} />
    }


  }
}
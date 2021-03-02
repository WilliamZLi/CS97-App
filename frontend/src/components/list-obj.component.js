import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true

export default class ListObj extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: false,
      loading: true,
      redirect: null,
    }
  }

  componentDidMount() {

    axios.post('http://localhost:5000/auth/logged')
      .then(arr => {
        console.log(arr)
        this.setState({ redirect: "/profile/"+ arr.data.id, loading: false })
      })
      .catch(err => {
        console.log(err)
        this.setState({loading: false, redirect: '/'})
      })

  }


  render() {
    if (this.state.redirect === null) {
      return (<div className="text-center">
        <p>Loading</p>
      </div>)
    }
    else {
      return <Redirect to={this.state.redirect} />
    }


  }
}
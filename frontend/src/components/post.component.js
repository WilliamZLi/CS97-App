import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import { withRouter, Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;


class Post extends Component {
    constructor(props) {
        super(props)
        // Setting up functions - set 'this' context to this class

        // Setting up state
        this.state = {
            logged: false,
            loading: true,
            caption: "",
            image: null,
        }
    }

    async fetchPost() {
        console.log("made it to fetchpost")
        const pid = {
            id: this.props.match.params.id      // holds id of post
        }
        console.log(pid)

        await axios.post('http://localhost:5000/post', pid)
            .then(res => {
                
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })


    }

    componentDidMount() {
        axios.post('http://localhost:5000/auth/logged')
            .then(res => {
                console.log('succ', res)
                this.setState({ logged: true })
                this.fetchPost()
            })
            .catch(err => {
                console.log('fail', err)
                this.setState({ loading: false })
            })
    }


    render() {
        return (
            <h3>
                This is a caption
                { this.props.caption }
            </h3>
        )
    }
}

export default withRouter(Post);

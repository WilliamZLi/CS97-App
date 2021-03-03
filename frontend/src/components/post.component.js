import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import { withRouter, Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
axios.defaults.withCredentials = true;

var Photo = props => ( // name, and 2 buttons
    <tr>
        <td>
            <Image src={`data:image/jpeg;base64,${props.photo}`} style={{ maxWidth: 800, maxHeight: 800 }} alt="alt" />
        </td>
        <td>{props.caption}</td>
    </tr>
)

var NoPhoto = props => (
    <tr>
        <td>Nothing here!</td>
    </tr>
)

class Post extends Component {
    constructor(props) {
        super(props)
        // Setting up functions - set 'this' context to this class
        this.convertName = this.convertName.bind(this)

        // Setting up state
        this.state = {
            logged: false,
            loading: true,
            caption: "",
            photo: null,
            uploader: null,
            date: null,
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
                console.log("made it back to fetch")
                console.log(res.data)

                var upldName = this.convertName(res.data.uploader)
                console.log("got past the convert")
                console.log(upldName)
                var newDate = res.data.date.slice(0,10)

                this.setState({
                    caption: res.data.caption,
                    photo: res.data.photo,
                    date: newDate,
                    uploader: res.data.uploader,
                    // uploader: upldName,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        axios.post('http://localhost:5000/auth/logged')
            .then(res => {
                console.log('succ', res)
                this.setState({ logged: true, loading: false })
                this.fetchPost()
            })
            .catch(err => {
                console.log('fail', err)
                this.setState({ loading: false })
            })
    }

    renderPhoto() {
        if (this.state.photo !== null) {
            return <Photo  photo={this.state.photo} />
        }
        else {
            return <NoPhoto />
        }
        
    }

    async convertName(nameID) {
        var newName;
        var IDs = [];
        IDs.push(nameID)
        console.log('working', nameID)
        newName = await axios.post('http://localhost:5000/name/getname', IDs)
            .then(resol => {
                newName = resol.data
                console.log(newName)
                console.log('done work')
            })
            .catch(err => {
                console.log(err)
            })
        return newName;
    }

    render() {
        if(this.state.loading) {
            return (<div>Loading...</div>)
          }
          else if (!this.state.logged) {
            return (<Redirect to='/'/>)
          }
        return (
            <div className="form-wrapper">
                <h4>
                    Date Uploaded:
                </h4>
                <header>
                    {this.state.date}
                </header>
                <h4>
                    Uploader ID:
                </h4>
                <header>
                    {this.state.uploader}
                </header>
                <h4>
                    Caption:
                </h4>
                <header>
                    {this.state.caption}
                </header>
                <h4>
                    Image:
                </h4>
                <header>
                    {this.renderPhoto()}
                </header>
            </div>

        )
    }
}

export default withRouter(Post);

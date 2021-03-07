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

var Comment = props => (
    <tr>
        <td>
            {props.user}
        </td>
        <td>
            {props.comment}
        </td>
    </tr>
)

var NoComment = props => (
    <tr>
        <td>No comments!</td>
    </tr>
)

class Post extends Component {
    constructor(props) {
        super(props)
        // Setting up functions - set 'this' context to this class
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            logged: false,
            loading: true,
            caption: "",
            photo: null,
            uploader: null,
            date: null,
            newComment: '',
            commentArray: [],
            disabled: false,
        }
    }

    onChangeComment(e) {
        this.setState({ newComment: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({disabled: true})
        
        // get the name of current user session
        
        const objObject = {
            id: this.props.match.params.id,
            comment: this.state.newComment,
        }

        if (objObject.comment === "") {
            this.setState({ newComment: '' , disabled: false})
            return;
        }
        axios.post('http://localhost:5000/post/addcomment', objObject)
            .then(res => {
                this.setState({ newComment: '', disabled: false})                
            })
            .catch(err => {
                this.setState({ newComment: '' , disabled: false})
                console.log(err)
                alert(err)
            })
    }

    commentList() {
        if (this.state.commentArray === undefined || this.state.commentArray.length === 0) {
            return <NoComment />
        }
        else if (this.state.commentArray !== null && this.state.commentArray.length !== 0) {
            return this.state.commentArray.map(comment => {
                console.log('comment', comment)
                return <Comment user={comment.user} comment={comment.comment} />
            })
        }
    }

    async fetchPost() {
        console.log("made it to fetchpost")
        const pid = {
            id: this.props.match.params.id      // holds id of post
        }
        console.log(pid)

        let upld = []

        await axios.post('http://localhost:5000/post/fetch', pid)
            .then(res => {
                console.log("made it back to fetch")
                console.log(res.data)
                
                // clean up date info
                var newDate = res.data.date.slice(0,10)

                upld.push(res.data.uploader)

                this.setState({
                    caption: res.data.caption,
                    photo: res.data.photo,
                    date: newDate,
                    uploader: res.data.uploader,
                    commentArray: res.data.comments,
                })
            })
            .catch(err => {
                console.log(err)
            })

        // convert nameID to username

        var upldName = await axios.post('http://localhost:5000/name/getname', upld)
            .then(resol => {
                upldName = resol.data.name
                console.log(upldName)
                console.log('done work')

                this.setState({
                    uploader: upldName
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
                    Uploader:
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
                <h4>
                    Comments:
                </h4>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.commentList()}
                    </tbody>
                </table>

                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="Comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="text" placeholder="Enter a comment"
                        value={this.state.newComment} onChange={this.onChangeComment} />
                    </Form.Group>

                    <Button variant="danger" size="lg" block="block" type="submit" disabled={this.state.disabled}>
                    {this.state.disabled ? 'Commenting..' : 'Comment'}
                    </Button>
                </Form>
            </div>

        )
    }
}

export default withRouter(Post);

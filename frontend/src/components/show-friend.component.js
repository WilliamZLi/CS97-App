import React, { Component } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
axios.defaults.withCredentials = true;

const Out = props => ( // name, and 2 buttons
    <tr>
        <td>{props.name}</td>
        <td>
            Waiting For their Response
        </td>
        <td>
            <Button onClick={props.onReject} id={props.name}>Undo Request</Button>
        </td>
    </tr>
)

const In = props => ( // name, and 2 buttons
    <tr>
        <td>{props.name}</td>
        <td>
            <Button onClick={props.onAccept} id={props.name}>Accept Request</Button>
        </td>
        <td>
            <Button onClick={props.onReject} id={props.name}>Reject Request</Button>
        </td>
    </tr>
)

const Friend = props => ( // name, and 2 buttons
    <tr>
        <td>{props.name}</td>
        <td>
            <Button onClick={props.onReject} id={props.name}>Unfriend</Button>
        </td>
    </tr>
)

var NoIn = props => (
    <tr>
        <td>Nothing here!</td>
        <td>Go add some friends!</td>
    </tr>
)
var NoOut = props => (
    <tr>
        <td>Nothing here!</td>
        <td>All requests cleared!</td>
    </tr>
)

var NoFren = props => (
    <tr>
        <td>Nothing here!</td>
        <td>Go add some friends!</td>
    </tr>
)

export default class Friends extends Component {
    constructor(props) {
        super(props)

        // Set up functions - set 'this' context to this class
        this.undoReq = this.undoReq.bind(this);
        this.acceptReq = this.acceptReq.bind(this);
        this.rejectReq = this.rejectReq.bind(this);
        this.unfriend = this.unfriend.bind(this);
        // Setting up state
        this.state = {
            pending: [], // people you friended
            requests: [], // people who friended you
            accepted: [], // people that you accepted/they accepted friend reqs
        }
    }
    fetchStatus() {
        axios.post('http://localhost:5000/friend/showfriend')
            .then(res => { // only remove if complete successfully
                console.log(res.data)

                this.setState({
                    pending: res.data.throwFriends !== undefined ? res.data.throwFriends : [],
                    requests: res.data.catchFriends !== undefined ? res.data.catchFriends : [],
                    accepted: res.data.friends !== undefined ? res.data.friends : []
                })
                console.log(this.state, 'check1')
            })
            .catch(err => { // if error, notify user
                console.log(err)
                alert(err)
            })
    }
    componentDidMount() {
        this.fetchStatus()
    }

    unfriend(e) {
        console.log('clicked unfriend!')
        console.log(e.target.id)
        axios.post('http://localhost:5000/friend/unfriend', { id: e.target.id })
            .then(res => {
                console.log('successful!')
                this.fetchStatus()
            })
            .catch(err => {
                console.log(err)
            })
    }

    undoReq(e) {
        console.log('clicked undo!')
        console.log(e.target.id)

        axios.post('http://localhost:5000/friend/undorequest', { id: e.target.id })
            .then(res => {
                console.log('successful!')
                this.fetchStatus()
            })
            .catch(err => {
                console.log(err)
            })
    }

    acceptReq(e) {
        console.log('clicked accept!')
        console.log(e.target.id)
        axios.post('http://localhost:5000/friend/acceptreq', { id: e.target.id })
            .then(res => {
                console.log('successful!')
                this.fetchStatus()
            })
            .catch(err => {
                console.log(err)
            })
    }


    rejectReq(e) {
        console.log('clicked reject!')
        console.log(e.target.id)
        axios.post('http://localhost:5000/friend/rejectreq', { id: e.target.id })
            .then(res => {
                console.log('successful!')
                this.fetchStatus()
            })
            .catch(err => {
                console.log(err)
            })
    }

    outList() {
        if (this.state.pending.length !== 0) {
            return this.state.pending.map(friend => {
                return <Out name={friend} onReject={this.undoReq} key={friend} />
            });
        }
        else { // if no matching users, means not found
            return <NoIn />
        }
    }
    inList() {
        if (this.state.requests.length !== 0) {
            return this.state.requests.map(friend => {
                return <In name={friend} onAccept={this.acceptReq} onReject={this.rejectReq} key={friend} />
            });
        }
        else { // if no matching users, means not found
            return <NoOut />
        }
    }

    friendList() {
        if (this.state.accepted.length !== 0) {
            return this.state.accepted.map(friend => {
                return <Friend name={friend} onReject={this.unfriend} key={friend} />
            });
        }
        else { // if no matching users, means not found
            return <NoFren />
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h3>Sent Requests</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.outList()}
                    </tbody>
                </table>

                <h3>Incoming Requests</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.inList()}
                    </tbody>
                </table>

                <h3>Friends</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.friendList()}
                    </tbody>
                </table>
            </div>
        )

    }
}

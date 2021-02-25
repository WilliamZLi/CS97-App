import React, { Component } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
axios.defaults.withCredentials = true;

const Pend = props => ( // name, and 2 buttons
    <tr>
        <td>{props.pending}</td> 
        <td>
            <Button id={props.pending} onClick= {props.onAccept} >Accept</Button>
        </td>
        <td>
            <Button onClick= {props.onReject}>Reject</Button>
        </td>
    </tr>
)


export default class Friends extends Component {
    constructor(props) {
        super(props)

        // Set up functions - set 'this' context to this class
        this.onAccept = this.onAccept.bind(this);
        this.onReject = this.onReject.bind(this);
        // Setting up state
        this.state = {
            pending: [], // people you friended
            requests: [], // people who friended you
            accepted: [], // people that you accepted/they accepted friend reqs
        }
    }
     componentDidMount()
    {
        axios.post('http://localhost:5000/friend/showfriend')
        .then(res => { // only remove if complete successfully
            console.log(res.data)
            
            this.setState({

                pending: res.data.throwFriends !== undefined ? res.data.throwFriends : [],
                requests: res.data.catchFriends !== undefined ? res.data.catchFriends : [],
                accepted: res.data.friends !== undefined ? res.data.friends : []
            })
            console.log(this.state,'check1')
        })
        .catch(err => { // if error, notify user
            console.log(err)
            alert(err)
        })
    }

    onAccept(e) {
        console.log("clicky!")
        console.log(e.target.id)
        console.log(this.state.pending)
      }
      onReject(e) {
        console.log("clacky!")
      }

    pendList() {
        return this.state.pending.map(friend => {
            return <Pend pending={friend} onAccept={this.onAccept} onReject = {this.onReject} key={friend} />
        });
    }

    render() {
            console.log(this.state)
            return (
                <div>
                    <h3>Pending Friends</h3>
                    <table className="table table-striped" style={{ marginTop: 20 }} >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.pendList()}
                        </tbody>
                    </table>
                </div>
            )

    }
}

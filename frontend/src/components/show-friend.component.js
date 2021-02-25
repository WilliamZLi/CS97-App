import React, { Component } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class Friends extends Component {
    constructor(props) {
        super(props)

        // Set up functions - set 'this' context to this class


        // Setting up state
        this.state = {
            initialized: false,
            pending: [], // people you friended
            requests: [], // people who friended you
            accepted: [], // people that you accepted/they accepted friend reqs
        }

        axios.post('http://localhost:5000/friend/showfriend')
            .then(res => { // only remove if complete successfully
                console.log(res.data.throwFriends === null)
                console.log(res.data)
                this.setState({ 
  
                    pending: res.data.throwFriends !== undefined ? res.data.throwFriends : [], 
                    requests: res.data.catchFriends !== undefined ? res.data.catchFriends : [], 
                    accepted: res.data.friends !== undefined ? res.data.friends : [] })
                console.log(this.state)
                this.setState({ initialized: true })
            })
            .catch(err => { // if error, notify user
                console.log(err)
                alert(err)
            })
    }

    render() {
        if (this.state.initialized === true) {
            console.log(this.state)
            var pendingFriends = this.state.pending.map(friend => {
                return <li key={friend}  className='pendingFriend' id={friend}>{friend}</li>
            });
            var requestingFriends = this.state.requests.map(friend => {
                return <li key={friend} className='pendingFriend' id={friend}>{friend}</li>
            });
            var acceptedFriends = this.state.accepted.map(friend => {
                return <li key={friend} className='pendingFriend' id={friend}>{friend}</li>
            });
            return (
                <div> Pending Requests
                    <ul className="pendingFriends" id="pendingFriends" >
                        {pendingFriends}
                    </ul>
                    Sent Requests
                    <ul className="pendingFriends" id="pendingFriends" >
                        {requestingFriends}
                    </ul>
                    Friends
                    <ul className="pendingFriends" id="pendingFriends" >
                        {acceptedFriends}
                    </ul>
                </div>
                
            )
        }
        else {
            return (<div>Loading...</div>)
        }

    }
}

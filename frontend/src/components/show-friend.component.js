import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Header from "../Header";
import "./show-friends.css";
import {
  FaUserMinus,
  FaUndoAlt,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";

axios.defaults.withCredentials = true;

const Out = (
  props // name, and 2 buttons
) => (
  <tr>
    <td>{props.name}</td>
    <td>Waiting For their Response</td>
    <td>
      <Button onClick={props.onReject} id={props.id} className="undoReq__Btn">
        <FaUndoAlt className="undo__req" />
        Undo Request
      </Button>
    </td>
  </tr>
);

const In = (
  props // name, and 2 buttons
) => (
  <tr>
    <td>{props.name}</td>
    <td>
      <Button onClick={props.onAccept} id={props.id} className="acceptReq__Btn">
        <FaUserCheck className="accept__req" />
        Accept Request
      </Button>
    </td>
    <td>
      <Button onClick={props.onReject} id={props.id} className="rejectReq__Btn">
        <FaUserTimes className="reject__req" />
        Reject Request
      </Button>
    </td>
  </tr>
);

const Friend = (
  props // name, and 2 buttons
) => (
  <tr>
    <td>{props.name}</td>
    <td>
      <Link to={"/profile/" + props.id}>Profile</Link>
    </td>
    <td>
      <Button onClick={props.onReject} id={props.id} className="unfriend__Btn">
        <FaUserMinus className="delete__friend" />
        Unfriend
      </Button>
    </td>
  </tr>
);

var NoIn = (props) => (
  <tr>
    <td>Nothing here!</td>
    <td>Go add some friends!</td>
  </tr>
);
var NoOut = (props) => (
  <tr>
    <td>Nothing here!</td>
    <td>All requests cleared!</td>
  </tr>
);

var NoFren = (props) => (
  <tr>
    <td>Nothing here!</td>
    <td>Go add some friends!</td>
  </tr>
);

export default class Friends extends Component {
  constructor(props) {
    super(props);

    // Set up functions - set 'this' context to this class
    this.undoReq = this.undoReq.bind(this);
    this.acceptReq = this.acceptReq.bind(this);
    this.rejectReq = this.rejectReq.bind(this);
    this.unfriend = this.unfriend.bind(this);
    // Setting up state
    this.state = {
      loading: true,
      logged: false,
      pending: [], // people you friended
      requests: [], // people who friended you
      accepted: [], // people that you accepted/they accepted friend reqs
      testarr: [],
    };
  }
  async fetchStatus() {
    await axios
      .post("http://localhost:5000/friend/showfriend")
      .then((res) => {
        // only remove if complete successfully
        // console.log(res.data);
        this.setState({
          pending:
            res.data.throwFriends !== undefined ? res.data.throwFriends : [],
          requests:
            res.data.catchFriends !== undefined ? res.data.catchFriends : [],
          accepted: res.data.friends !== undefined ? res.data.friends : [],
        });
        // console.log(this.state, "check1");
      })
      .catch((err) => {
        // if error, notify user
        // console.log(err);
        alert(err);
      });
    await axios
      .post("http://localhost:5000/name/getnames", this.state.accepted)
      .then((res) => {
        // console.log(res);
        this.setState({
          accepted: res.data.sort((a, b) => (a.name > b.name ? 1 : -1)),
        }); // sort alphabetically
      });
    await axios
      .post("http://localhost:5000/name/getnames", this.state.requests)
      .then((res) => {
        // console.log(res);
        this.setState({
          requests: res.data.sort((a, b) => (a.name > b.name ? 1 : -1)),
        }); // sort alphabetically
      });
    await axios
      .post("http://localhost:5000/name/getnames", this.state.pending)
      .then((res) => {
        // console.log(res);
        this.setState({
          pending: res.data.sort((a, b) => (a.name > b.name ? 1 : -1)),
        }); // sort alphabetically
      });
    // console.log(this.state);
  }
  componentDidMount() {
    axios
      .post("http://localhost:5000/auth/logged")
      .then((arr) => {
        // console.log(arr);
        this.setState({ logged: true, loading: false });
        this.fetchStatus();
      })
      .catch((err) => {
        // console.log(err);
        this.setState({ loading: false });
      });
  }

  unfriend(e) {
    // console.log("clicked unfriend!");
    // console.log(e.target.id);
    axios
      .post("http://localhost:5000/friend/unfriend", { id: e.target.id })
      .then((res) => {
        // console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  undoReq(e) {
    // console.log("clicked undo!");
    // console.log(e.target.id);

    axios
      .post("http://localhost:5000/friend/undorequest", { id: e.target.id })
      .then((res) => {
        // console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  acceptReq(e) {
    // console.log("clicked accept!");
    // console.log(e.target.id);
    axios
      .post("http://localhost:5000/friend/acceptreq", { id: e.target.id })
      .then((res) => {
        // console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  rejectReq(e) {
    // console.log("clicked reject!");
    // console.log(e.target.id);
    axios
      .post("http://localhost:5000/friend/rejectreq", { id: e.target.id })
      .then((res) => {
        // console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  outList() {
    if (this.state.pending.length !== 0) {
      return this.state.pending.map((friend) => {
        return (
          <Out
            name={friend.name}
            id={friend._id}
            onReject={this.undoReq}
            key={friend._id}
          />
        );
      });
    } else {
      // if no matching users, means not found
      return <NoIn />;
    }
  }

  inList() {
    if (this.state.requests.length !== 0) {
      return this.state.requests.map((friend) => {
        return (
          <In
            name={friend.name}
            id={friend._id}
            onAccept={this.acceptReq}
            onReject={this.rejectReq}
            key={friend._id}
          />
        );
      });
    } else {
      // if no matching users, means not found
      return <NoOut />;
    }
  }

  friendList() {
    if (this.state.accepted.length !== 0) {
      return this.state.accepted.map((friend) => {
        return (
          <Friend
            name={friend.name}
            id={friend._id}
            onAccept={this.acceptReq}
            onReject={this.unfriend}
            key={friend._id}
          />
        );
      });
    } else {
      // if no matching users, means not found
      return <NoFren />;
    }
  }

  render() {
    // console.log(this.state);
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (!this.state.logged) {
      return <Redirect to="/" />;
    }
    return (
      <div className="user-home">
        <Header />
        <div className="user-container">
          <div className="user-contents friends">
            <div className="sent__requests">
              <h3>Sent Requests</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{this.outList()}</tbody>
              </table>
            </div>
            <div className="incoming__requests">
              <hr />
              <h3>Incoming Requests</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{this.inList()}</tbody>
              </table>
            </div>
            <div className="current__friends">
              <hr />
              <h3>Friends</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{this.friendList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import { Link, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Header from "../Header";
axios.defaults.withCredentials = true;

var NewPerson = (
  props // name, and 2 buttons
) => (
  <tr>
    <td>{props.result}</td>

    <td>
      <Button id={props.id} onClick={props.addFriend}>
        Friend
      </Button>
    </td>
  </tr>
);

var CurrFriend = (
  props // already friends
) => (
  <tr>
    <td>{props.result}</td>

    <td>Already Friends!</td>
    <td>
      <Button id={props.id} onClick={props.unfriend}>
        Unfriend
      </Button>
    </td>
  </tr>
);

var SentReq = (
  props // req you sent
) => (
  <tr>
    <td>{props.result}</td>

    <td>
      <Button id={props.id} onClick={props.undo}>
        Undo Req
      </Button>
    </td>
  </tr>
);

var GotReq = (
  props // req you got
) => (
  <tr>
    <td>{props.result}</td>

    <td>
      <Button id={props.id} onClick={props.acceptReq}>
        Accept Req
      </Button>
    </td>

    <td>
      <Button id={props.id} onClick={props.rejectReq}>
        Reject Req
      </Button>
    </td>
  </tr>
);

var NoResult = (props) => (
  <tr>
    <td>User Not Found! Please note names are case sensitive!</td>
  </tr>
);

var Post = (
  props // name, and 2 buttons
) => (
  <tr>
    <td>
      <Image
        src={`data:image/jpeg;base64,${props.photo}`}
        style={{ maxWidth: 60, maxHeight: 60 }}
        alt="alt"
      />
    </td>
    <td>{props.caption}</td>
    <td>
      <Link to={"/post/" + props.id}>View</Link>
    </td>
  </tr>
);

var NoPost = (props) => (
  <tr>
    <td>Nothing here!</td>
  </tr>
);

var IsMe = (props) => (
  <tr>
    <td>This is you!</td>
  </tr>
);

export default class Search extends Component {
  constructor(props) {
    super(props);

    // Set up functions - set 'this' context to this class
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.undoReq = this.undoReq.bind(this);
    this.acceptReq = this.acceptReq.bind(this);
    this.rejectReq = this.rejectReq.bind(this);
    this.unfriend = this.unfriend.bind(this);
    // Setting up state
    this.state = {
      loading: true,
      logged: false,
      query: "",
      captureUser: null,
      captureCapt: null,
      currentFriends: [],
      sentReqs: [],
      gotReqs: [],
      myId: "",
      disabled: false,
    };
  }

  fetchStatus() {
    axios
      .post("http://localhost:5000/friend/showfriend")
      .then((res) => {
        // only remove if complete successfully
        console.log(res.data);

        this.setState({
          sentReqs:
            res.data.throwFriends !== undefined ? res.data.throwFriends : [], // set up data structures
          gotReqs:
            res.data.catchFriends !== undefined ? res.data.catchFriends : [],
          currentFriends:
            res.data.friends !== undefined ? res.data.friends : [],
        });
        console.log(this.state, "check1");
      })
      .catch((err) => {
        // if error, notify user
        console.log(err);
        alert(err);
      });
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/auth/logged")
      .then((arr) => {
        console.log(arr);
        this.setState({ logged: true, loading: false, myId: arr.data.id });
        this.fetchStatus();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  onChangeQuery(e) {
    this.setState({ query: e.target.value });
  }

  unfriend(e) {
    console.log("clicked unfriend!");
    console.log(e.target.id);
    axios
      .post("http://localhost:5000/friend/unfriend", { id: e.target.id })
      .then((res) => {
        console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  acceptReq(e) {
    console.log("clicked accept!");
    console.log(e.target.id);
    axios
      .post("http://localhost:5000/friend/acceptreq", { id: e.target.id })
      .then((res) => {
        console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  rejectReq(e) {
    console.log("clicked reject!");
    console.log(e.target.id);
    axios
      .post("http://localhost:5000/friend/rejectreq", { id: e.target.id })
      .then((res) => {
        console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  undoReq(e) {
    console.log("clicked undo!");
    console.log(e.target.id);

    axios
      .post("http://localhost:5000/friend/undorequest", { id: e.target.id })
      .then((res) => {
        console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addFriend(e) {
    console.log("clicked add!");
    console.log(e.target.id);

    axios
      .post("http://localhost:5000/friend/addfriend", { id: e.target.id })
      .then((res) => {
        console.log("successful!");
        this.fetchStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ disabled: true });
    const searchString = {
      query: this.state.query,
    };

    if (searchString === "") {
      alert("Cannot be an empty form");
      return;
    }
    axios
      .post("http://localhost:5000/search/user", searchString)
      .then((res) => {
        // only remove if complete successfully
        if (res.status === 204) {
          // if user not found, set array to blank
          this.setState({ query: "", captureUser: [] });
        } else {
          // otherwise empty array and swap
          let temp = [];
          temp.push(res.data);
          console.log(temp);
          this.setState({ query: "", captureUser: temp });
          console.log(this.state.captureUser);
        }
      })
      .catch((err) => {
        // if error, notify user
        this.setState({ query: "" });
        console.log(err);
        alert(err);
      });

    axios
      .post("http://localhost:5000/search/post", searchString)
      .then((res) => {
        // only remove if complete successfully
        if (res.status === 204) {
          // if keyword not found, set array to blank
          this.setState({ query: "", captureCapt: [] });
        } else {
          // otherwise empty array and swap
          let temp = [];
          temp = res.data;
          console.log(temp);
          this.setState({ query: "", captureCapt: temp, disabled: false });
          console.log(this.state.captureCapt);
        }
      })
      .catch((err) => {
        // if error, notify user
        this.setState({ query: "" });
        console.log(err);
        alert(err);
      });
  }

  userList() {
    if (
      this.state.captureUser !== null &&
      this.state.captureUser.length !== 0
    ) {
      // once not null, swap depending on status
      return this.state.captureUser.map((person) => {
        if (this.state.currentFriends.includes(person._id))
          return (
            <CurrFriend
              result={person.name}
              id={person._id}
              unfriend={this.unfriend}
              key={person._id}
            />
          );
        else if (this.state.sentReqs.includes(person._id))
          return (
            <SentReq
              result={person.name}
              id={person._id}
              undo={this.undoReq}
              key={person._id}
            />
          );
        else if (this.state.gotReqs.includes(person._id))
          return (
            <GotReq
              result={person.name}
              id={person._id}
              rejectReq={this.rejectReq}
              acceptReq={this.acceptReq}
              key={person._id}
            />
          );
        else if (this.state.myId === person._id) {
          return <IsMe key={person._id} />;
        } else
          return (
            <NewPerson
              result={person.name}
              id={person._id}
              addFriend={this.addFriend}
              key={person._id}
            />
          );
      });
    } else if (this.state.captureUser !== null) {
      // if no matching users, means not found
      return <NoResult />;
    }
  }

  postList() {
    if (
      this.state.captureCapt !== null &&
      this.state.captureCapt.length !== 0
    ) {
      return this.state.captureCapt.map((picture) => {
        return (
          <Post
            caption={picture.caption}
            id={picture._id}
            photo={picture.photo}
            key={picture._id}
          />
        );
      });
    } else if (this.state.captureCapt !== null) {
      // if no matching users, means not found
      return <NoPost />;
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (!this.state.logged) {
      return <Redirect to="/" />;
    }

    return (
      <div className="user-home">
        <Header />
        <div className="user-container">
          <div className="user-contents">
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="Search">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter search term"
                  value={this.state.query}
                  onChange={this.onChangeQuery}
                />
              </Form.Group>

              <Button
                variant="danger"
                size="lg"
                block="block"
                type="submit"
                disabled={this.state.disabled}
              >
                {this.state.disabled ? "Searching.." : "Search"}
              </Button>
            </Form>
            <h3>Search Results</h3>
            <h4>Users</h4>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.userList()}</tbody>
            </table>
            <h4>Posts</h4>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Caption</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.postList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

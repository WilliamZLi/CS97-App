import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, withRouter, Redirect } from "react-router-dom";
import Header from "../Header";
import "./profile.css";
import { HiOutlineArrowsExpand } from "react-icons/hi";

axios.defaults.withCredentials = true;

const Post = (
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
      <Link to={"/post/" + props.id} className="expand-icon-link">
        <HiOutlineArrowsExpand className="expand__icon" />
      </Link>
    </td>
  </tr>
);

var NoPost = (props) => (
  <tr>
    <td>Nothing here!</td>
  </tr>
);

class Profile extends Component {
  constructor(props) {
    super(props);

    // Setting up functions - set 'this' context to this class

    // Setting up state
    this.state = {
      logged: false,
      loading: true,
      found: false,
      id: null,
      name: null,
      gallery: [],
      myProfile: false,
    };
  }
  async getAll() {
    const uid = this.props.match.params.id;
    console.log(uid);
    var array = [];
    array.push(uid);
    await axios.post("http://localhost:5000/log").then((res) => {
      if (res.data.id === uid) this.setState({ myProfile: true });
    });
    await axios
      .post("http://localhost:5000/name/getname", array)
      .then((res) => {
        console.log(res);
        if (res.status !== 204)
          this.setState({ id: res.data._id, name: res.data.name, found: true });
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.state.found) {
      await axios
        .post("http://localhost:5000/objs/profile-obj", array)
        .then((res) => {
          console.log("success", res.data);
          this.setState({
            gallery: res.data.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            ),
            loading: false,
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    console.log("afterload", this.state);
  }
  componentDidMount() {
    axios
      .post("http://localhost:5000/auth/logged")
      .then((res) => {
        console.log("succ", res);
        this.setState({ logged: true });
        this.getAll();
      })
      .catch((err) => {
        console.log("fail", err);
        this.setState({ loading: false });
      });
  }

  postList() {
    if (this.state.gallery.length !== 0) {
      return this.state.gallery.map((picture) => {
        return (
          <Post
            caption={picture.caption}
            id={picture._id}
            photo={picture.photo}
            key={picture._id}
          />
        );
      });
    } else {
      // if no matching users, means not found
      return <NoPost />;
    }
  }

  render() {
    if (this.state.loading)
      // initially just show loading
      return <div>Loading...</div>;
    else if (!this.state.logged) {
      // once loading done, if logged false, don't show page
      return <Redirect to="/" />;
    }
    if (this.state.found) {
      return (
        <div className="user-home">
          <Header />
          <div className="user-container">
            <div className="user-contents">
              <header className="user__identity">
                {this.state.name}'s Profile{" "}
                {this.state.myProfile ? "(Your Profile)" : ""}
              </header>
              <hr />
              <h3>Posts</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Caption</th>
                  </tr>
                </thead>
                <tbody>{this.postList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-wrapper">
          <Header />
          <header>No profile found</header>
          <header>Are you sure this is a user?</header>
          <hr />
        </div>
      );
    }
  }
}

export default withRouter(Profile);

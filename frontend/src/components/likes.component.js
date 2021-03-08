import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { Link, withRouter, Redirect } from "react-router-dom";
import Header from "../Header";
import "./likes.css";
import { FaUser } from "react-icons/fa";
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
      <Link to={"/profile/" + props.uploader}>{props.poster}</Link>
    </td>
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

class Likes extends Component {
  constructor(props) {
    super(props);

    // Setting up functions - set 'this' context to this class

    // Setting up state
    this.state = {
      logged: false,
      loading: true,
      found: false,
      myId: null,
      name: null,
      gallery: [],
      myProfile: false,
    };
  }

  async getAll() {
    await axios.post("http://localhost:5000/log").then((res) => {
      this.setState({ myId: res.data.id, logged: true });
    });
    await axios
      .post("http://localhost:5000/objs/favorite-obj", [this.state.myId])
      .then((res) => {
        console.log("success", res.data);
        this.setState({
          gallery: res.data.sort((a, b) => new Date(b.date) - new Date(a.date)),
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
    let temp = this.state.gallery;
    await Promise.all(
      temp.map(async (post) => {
        const poster = await axios.post("http://localhost:5000/name/getname", [
          post.uploader,
        ]);
        post.poster = poster.data.name; // add name to poster
      })
    ).then((result) => {
      this.setState({ gallery: temp, found: true, loading: false });
    });
    console.log("afterload", this.state);
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/auth/logged")
      .then((arr) => {
        console.log(arr);
        this.getAll();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, redirect: "/" });
      });
  }

  postList() {
    if (this.state.gallery.length !== 0) {
      return this.state.gallery.map((picture) => {
        return (
          <Post
            caption={picture.caption}
            id={picture._id}
            uploader={picture.uploader}
            poster={picture.poster}
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
              <header className="likes__header">
                Your Likes{" "}
                <Link to={"/myProfile"} className="profile-page-link">
                  <FaUser className="likes__profileIcon" /> Profile
                </Link>
              </header>
              <hr />
              <h3>Likes</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Caption</th>
                    <th>Uploader</th>
                    <th>View</th>
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
        <div className="user-home">
          <Header />
          <div className="user-container">
            <div className="user-contents no__page">
              {" "}
              <header>No profile found</header>
              <header>Are you sure this is a user?</header>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Likes);

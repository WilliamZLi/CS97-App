import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import { withRouter, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Header from "../Header";
import "./post.css";
import { AiTwotoneLike } from "react-icons/ai";

axios.defaults.withCredentials = true;

var Photo = (
  props // name, and 2 buttons
) => (
  <tr>
    <td>
      <Image
        src={`data:image/jpeg;base64,${props.photo}`}
        style={{ maxWidth: 800, maxHeight: 800 }}
        alt="alt"
      />
    </td>
    <td>{props.caption}</td>
  </tr>
);

var NoPhoto = (props) => (
  <tr>
    <td>Nothing here!</td>
  </tr>
);

var Comment = (props) => (
  <tr>
    <td>{props.user}</td>
    <td>{props.comment}</td>
  </tr>
);

var NoComment = (props) => (
  <tr>
    <td>No comments!</td>
  </tr>
);

class Post extends Component {
  constructor(props) {
    super(props);
    // Setting up functions - set 'this' context to this class
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.likePost = this.likePost.bind(this);
    // Setting up state
    this.state = {
      logged: false,
      loading: true,
      caption: "",
      photo: null,
      uploader: null,
      date: null,
      newComment: "",
      commentArray: [],
      disabled: false,
      liked: false,
      likes: undefined,
      likeDisabled: false,
      found: false
    };
  }

  onChangeComment(e) {
    this.setState({ newComment: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ disabled: true });

    // get the name of current user session

    const objObject = {
      id: this.props.match.params.id,
      comment: this.state.newComment,
    };

    if (objObject.comment === "") {
      this.setState({ newComment: "", disabled: false });
      return;
    }
    axios
      .post("http://localhost:5000/post/addcomment", objObject)
      .then((res) => {
        this.fetchPost();
        this.setState({ newComment: "", disabled: false });
      })
      .catch((err) => {
        this.setState({ newComment: "", disabled: false });
        console.log(err);
        alert(err);
      });
  }

  commentList() {
    if (
      this.state.commentArray === undefined ||
      this.state.commentArray.length === 0
    ) {
      return <NoComment />;
    } else if (
      this.state.commentArray !== null &&
      this.state.commentArray.length !== 0
    ) {
      return this.state.commentArray.map((comment) => {
        console.log("comment", comment);
        return <Comment user={comment.user} comment={comment.comment} />;
      });
    }
  }

  async fetchPost() {
    console.log("made it to fetchpost");
    const pid = {
      id: this.props.match.params.id, // holds id of post
    };
    console.log(pid);

    let upld = [];

    await axios
      .post("http://localhost:5000/post/fetch", pid)
      .then((res) => {
        console.log("made it back to fetch");
        console.log(res.data);
        if (res.status !== 204) {
          // clean up date info
          var newDate = res.data.date.slice(0, 10);

          upld.push(res.data.uploader);

          this.setState({
            caption: res.data.caption,
            photo: res.data.photo,
            date: newDate,
            uploader: res.data.uploader,
            commentArray: res.data.comments,
            likes: res.data.likeArray,
            found: true
          });
          console.log(this.state);
        }
        else {
          this.setState({ found: false })
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post("http://localhost:5000/post/likeStatus")
      .then((resol) => {
        console.log("returned", resol.data.likeArray);
        if (resol.data.likeArray !== undefined) {
          if (resol.data.likeArray.includes(this.props.match.params.id))
            this.setState({ liked: true });
          else this.setState({ liked: false });
        }
        console.log("after check", this.state);
      })
      .catch((err) => {
        console.log(err);
      });

    // convert nameID to username
    var upldName = await axios
      .post("http://localhost:5000/name/getname", upld)
      .then((resol) => {
        upldName = resol.data.name;
        console.log(upldName);
        console.log("done work");

        this.setState({
          uploader: upldName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/auth/logged")
      .then((res) => {
        console.log("succ", res);
        this.setState({ logged: true, loading: false });
        this.fetchPost();
      })
      .catch((err) => {
        console.log("fail", err);
        this.setState({ loading: false });
      });
  }

  likePost() {
    this.setState({ likeDisabled: true });
    axios
      .post("http://localhost:5000/post/likePost", {
        likeState: this.state.liked,
        post: this.props.match.params.id,
      })
      .then((resol) => {
        console.log("returned", resol);
        console.log("after like", this.state);
        this.setState({ likeDisabled: false });
        this.fetchPost();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderPhoto() {
    if (this.state.photo !== null) {
      return <Photo photo={this.state.photo} />;
    } else {
      return <NoPhoto />;
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (!this.state.logged) {
      return <Redirect to="/" />;
    }
    if (this.state.found) {
      return (
        <div className="user-home">
          <Header />
          <div className="user-container">
            <div className="user-contents">
              <div className="photo__container">
                {/* <h4>Image:</h4> */}
                <header>{this.renderPhoto()}</header>
                <div className="photo__info">
                  <h4 className="upload__date">Date Uploaded:</h4>
                  <header className="upload__dateHeader">
                    {this.state.date}
                  </header>
                  <h4 className="uploader__name">Uploader:</h4>
                  <header>{this.state.uploader}</header>
                </div>
                <h4>Caption:</h4>
                <header>{this.state.caption}</header>
              </div>
              <div className="like__btnContainer">
                <p className="like__counter">
                  <AiTwotoneLike className="likeIcon__counter" />:{" "}
                  {this.state.likes !== undefined ? this.state.likes.length : "0"}
                </p>{" "}
                <Button
                  className="like__Button"
                  // variant="primary"
                  block="block"
                  disabled={this.state.likeDisabled}
                  onClick={this.likePost}
                >
                  <AiTwotoneLike className="post__likeIcon" />
                  {this.state.liked ? "Liked" : "Like"}
                </Button>
              </div>
              <hr />
              <h4>Comments:</h4>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>{this.commentList()}</tbody>
              </table>
              <Form onSubmit={this.onSubmit}>
                <Form.Group className="form-group post" controlId="Comment">
                  <Form.Label className="form-label post">Comment</Form.Label>
                  <div className="comment__container">
                    <Form.Control
                      className="form-control post"
                      type="text"
                      placeholder="Enter a comment"
                      value={this.state.newComment}
                      onChange={this.onChangeComment}
                    />

                    <Button
                      className="comment__Button"
                      size="lg"
                      block="block"
                      type="submit"
                      disabled={this.state.disabled}
                    >
                      {this.state.disabled ? "Commenting.." : "Comment"}
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="form-wrapper">
          <Header />
          <header>No post found</header>
          <header>Are you sure this is a post?</header>
          <hr />
        </div>
      );
    }
  }

}

export default withRouter(Post);

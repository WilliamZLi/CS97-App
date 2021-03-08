import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateObj from "./components/create-obj.component";
import MyProfile from "./components/list-obj.component";
import Logout from "./components/logout.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import NotFound from "./components/notfound.component";
import Home from "./components/home.component";
import Search from "./components/search.component"; // import Search
import Friends from "./components/show-friend.component";
import Profile from "./components/profile.component";
import Post from "./components/post.component";
import Likes from "./components/likes.component";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Container> */}
        {/* <Row> */}
        {/* <Col md={12}> */}
        {/* <div className="wrapper"> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create-obj" component={CreateObj} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/MyProfile" component={MyProfile} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/likes" component={Likes} />

          <Route path="" component={NotFound} />
        </Switch>
        {/* </div> */}
        {/* </Col> */}
        {/* </Row> */}
        {/* </Container> */}
      </div>
    </Router>
  );
}

export default App;

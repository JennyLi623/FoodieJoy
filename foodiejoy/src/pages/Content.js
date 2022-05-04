import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import Post from "./Post";
import User from "./User";

class Content extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { handleLogOut, handleLogIn, loggedIn, likeDish, likedDish } = this.props;
    if (!loggedIn) {
      return (
        <div className="content">
          <Switch>
            <Route
              exact
              path="/register"
              component={props => <Register {...this.props} />}
            />
            <Route
              exact
              path="/login"
              component={props => <Login handleLogIn={handleLogIn} {...this.props} />}
            />
            <Route
              exact
              path="/"
              component={props => <Landing {...this.props} />}
            />
          </Switch>
        </div>
      );
    };
    return (
      <div  className="content">
        <Switch>
          <Route
            exact
            path="/post"
            component={props => <Post {...this.props} />}
          />
          <Route
            exact
            path="/profile"
            component={props => <User {...this.props} />}
          />
          <Route
            exact
            path="/main"
            component={props => <Main {...this.props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Content;

import React, { Component } from "react";
import {Link} from 'react-router-dom';

class Main extends Component {
  state = {
    name: "",
    password: "",
    loggedIn: 0
  };

  handleSubmit = () => {
    const { handleLogIn } = this.props;
    const { name, password } = this.state;
    this.setState({loggedIn: 1});
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, password } = this.state;
    return (
      <div>
        Food List
      </div>
    );
  }
}

export default Main;

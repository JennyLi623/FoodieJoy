import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Dish from "./Dish";
import DishList from "./DishList";


class Main extends Component {
  state = {
    name: "",
    password: "",
    loggedIn: 0,
    detail: false,
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
    const { name, password, detail } = this.state;
    if (detail === true) {
      return (
        <div>
          <Dish />
        </div>
      );
    }
    return (
      <div>
        <div>
          Search for food
        </div>
        <div>
          <DishList />
        </div>
      </div>
    );
  }
}

export default Main;

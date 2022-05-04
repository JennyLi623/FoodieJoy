import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import foodpost from "./../static/foodpost.jpeg";
import userpic from "./../static/user.png";
import ReactRoundedImage from "react-rounded-image";
import './../css/user.css';
import DishList from "./DishList.js";
import SearchBox from './SearchBox';
import foodlist from "./dishes.js";

class User extends Component {
  state = {};
  constructor(){
    super();
  this.state = {
    name: "",
    password: "",
    loggedIn: 0,
    detail: false,
    searchfield: '',
    dishes:[]
  }
}
componentDidMount(){
  this.setState({dishes: foodlist});
}

  render() {
    const { name, email, userID, intro } = this.props;

    return (
      <div id = "user">
        <Container >
          <Row>
            <Col md="5" >
              <ReactRoundedImage
              image={userpic}
              roundedColor= "#fcf5ed"
              imageWidth="300"
              imageHeight="300"
              roundedSize="5"
              />
            </Col>
            <Col md="5">
              <p className="uname">
                {name}
              </p>
              <p className="uemail">
                {email}
              </p>
              <p className="uintro">
                {intro}
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <p className="title">
            Collected Items
          </p>
        </Container>
        <div>
              <div id='main-bg'>
                <DishList dishes={this.state.dishes}/>
              </div>
        </div>
      </div>

    );
  }
}

export default User;

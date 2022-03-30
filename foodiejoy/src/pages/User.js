import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import foodpost from "./../static/foodpost.jpeg";
import userpic from "./../static/user.png";
import ReactRoundedImage from "react-rounded-image";

class User extends Component {
  state = {};
  render() {
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
              <p className="username">
                Name
              </p>
              <p className="username">
                Email
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <p className="title">
            Collected Items
          </p>
        </Container>
      </div>
    );
  }
}

export default User;

import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import foodpost from "./../static/foodpost.jpeg";
// This is the dishdetail page

class Dish extends Component {
  state = {};
  render() {
    return (
      <div>
      <Container>
        <Row>
          <Col md="6">
            <img className="img-fluid postimg" src={foodpost} />
          </Col>
          <Col md="6">
            <p>
              Name
            </p>
            <p>
              email
            </p>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Dish;

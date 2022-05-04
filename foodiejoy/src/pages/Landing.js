import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import foodpost from "./../static/foodpost.jpeg";
import './../css/landing.css';

class Landing extends Component {
  state = {};

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div id='bg'>
          <h1 id='title'>FoodieJoy</h1>
          <p className="sTitle">A community for you to find your favorite dish</p>
        </div>
        <div className="intro">

        <Container>
          <Row>
            <Col md="6">
              <img className="img-fluid postimg" src={foodpost} />
            </Col>
            <Col md="6">
              <p className="content">
                Sign up today and share your favorite dish in nearby restaurants to the greater community and make more friends!!!
              </p>
            </Col>
          </Row>
        </Container>
        </div>
        <div className="signupsection">
          <Link to="/register">
            <Button className="signupbtn">
              Click Here to Sign Up!
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;

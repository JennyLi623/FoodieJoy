import React, { Component } from "react";
import {Link} from 'react-router-dom';
import fastfood from "./../static/fastfood.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {Container, Row, Col} from 'react-bootstrap';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    repwd: "",
    intro: "",
    submit: 0,
    success: 0
  };

  handleSubmit = e => {
    const { name, email, password, repwd} = this.state;
    // connect to backend
    this.setState({success: 1});
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, email, password, repwd, intro, submit, success } = this.state;
    if (success === 1) {
      return(
        <div>
          <p>You have just successfully registered!</p>
          <p><Link to="/login">Please Click Here to go to Log In Page</Link></p>
        </div>
      );
    }
    return (
      <div>
      <Container style={{maxWidth: "1000px", padding: "100px 20px"}}>
        <Row>
          <Col md="6">
            <img className="img-fluid" src={fastfood} />
          </Col>
          <Col md="6">
        <h1 className="login-title">Sign Up</h1>
        <form onSubmit={e => { e.preventDefault();}}>
          <TextField
            id="standard-input"
            label="Name"
            type="text"
            placeholder='Name'
            name="name"
            value={name}
            onChange={this.updateField}
            variant="standard"
            style={{width: "300px"}}
          />
          <br />
          <TextField
            id="standard-input"
            label="Email"
            type="text"
            placeholder='Email'
            name="email"
            value={email}
            onChange={this.updateField}
            variant="standard"
            style={{width: "300px"}}
          />
          <br />
          <TextField
            id="standard-password-input"
            type="password"
            label="Password"
            placeholder='Password'
            name="password"
            value={password}
            onChange={this.updateField}
            variant="standard"
            style={{width: "300px"}}
          />
          <br />
          <TextField
            id="standard-password-input"
            type="password"
            label="Re-Enter Password"
            placeholder='Re-enter Password'
            name="repwd"
            value={repwd}
            onChange={this.updateField}
            variant="standard"
            style={{width: "300px"}}
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-static"
            type="text"
            label="Intro"
            placeholder='Brief Intro About You'
            name="intro"
            value={intro}
            onChange={this.updateField}
            variant="standard"
            style={{width: "300px"}}
            multiline
            rows={6}
            variant="outlined"
          />
          <br />
          <br />

          <Link to="/" style={{ textDecoration: 'none'}}><Button onClick={() => this.handleSubmit()} style={{ background: "burlywood", color: "white"}}>Sign Up</Button></Link>
        </form>
        <br />
        <Link to="/register" style={{ textDecoration: 'underline', color: "#555555" }}><p>Click here to login</p></Link>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default Register;

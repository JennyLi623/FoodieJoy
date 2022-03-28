import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import fastfood from "./../static/fastfood.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


class Login extends Component {
  state = {
    email: "",
    password: "",
    loggedIn: 0
  };

  handleSubmit = () => {
    const { handleLogIn } = this.props;
    const { email, password } = this.state;

    this.setState({loggedIn: 1});
    handleLogIn(email, password);
    this.setState({loggedIn: 2});
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    if (this.state.loggedIn === 2) {
      return(
        <div>
          <p>您已成功登录</p>
          <Link to="/">返回首页开始实验</Link>
        </div>
      );
    }
    if (this.state.loggedIn === 1) {
      return(
        <div>
          <p>Logging In ...</p>
          <p>Please Wait ...</p>
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
            <h1  className="login-title">Login</h1>
            <br />
            <br />
            <form onSubmit={e => { e.preventDefault();}}>
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
              <br />
              <br />
              <br />
              <Link to="/" style={{ textDecoration: 'none'}}><Button onClick={() => this.handleSubmit()} style={{ background: "burlywood", color: "white"}}>Submit</Button></Link>
            </form>
            <br />
            <Link to="/register" style={{ textDecoration: 'underline', color: "#555555" }}><p>Click here to register</p></Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

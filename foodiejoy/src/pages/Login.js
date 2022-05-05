import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import fastfood from "./../static/fastfood.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {auth} from './../service/firebase.js';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { collection, getDoc , doc } from "firebase/firestore";
import {db} from './../service/firebase.js';

class Login extends Component {
  state = {
    email: "",
    password: "",
    loggedIn: 0,
    userID: ""
  };

  handleSubmit = () => {
    const { handleLogIn } = this.props;
    const { email, password } = this.state;

    this.setState({loggedIn: 1});
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      var user = userCredential.user;
      this.setState({userID: user.uid});
      this.getUser(user.uid).then((u) => {
        console.log("handle login Submit");
        console.log(u);
        handleLogIn(u.name, u.email, u.UserID, u.intro);
      });

      this.setState({loggedIn: 2});
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message);
    });
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getUser = async (userID) => {
     var docRef = doc(db, "users", userID);
     const docSnap = await getDoc(docRef);
     return docSnap.data();

 };

  render() {
    const { email, password } = this.state;
    if (this.state.loggedIn === 2) {
      return(
        <div>
          <p>Logged In Successfully</p>
          <Link to="/main">Go back to mainpage</Link>
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
              <Link to="/main" style={{ textDecoration: 'none'}}><Button onClick={() => this.handleSubmit()} style={{ background: "burlywood", color: "white"}}>Submit</Button></Link>
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

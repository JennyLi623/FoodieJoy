import React, { Component } from "react";
import {Link} from 'react-router-dom';
import fastfood from "./../static/fastfood.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {Container, Row, Col} from 'react-bootstrap';
import {auth} from './../service/firebase.js';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import {db} from './../service/firebase.js';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    repwd: "",
    intro: "",
    submit: 0,
    success: 0,
    docRef: "",
    UserID: ""
  };

  handleSignUp = () => {
    const { name, email, password, repwd, intro} = this.state;
    console.log("hiiiiii");
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(userCredential);
          console.log(userCredential.user.getIdToken());
          console.log(userCredential.user.uid);
          this.UserID = userCredential.user.uid;
          this.addUser({
            name: name,
            email: email,
            password: password,
            repwd: repwd,
            intro: intro,
            UserID: this.UserID
          })

          this.setState({success: 1});
          user.getIdToken().then((id)=>{
            const data = {
            idToken : id,
           };
          })
          .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    this.setState({success: 1});

  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

   addUser = async (data) => {
      //addDoc(collection(db, "users"), data);
      //console.log("Document written with ID: ", docRef.id);
      this.docRef = await setDoc(doc(db, "users", this.UserID), data);
      //console.log("Document written with ID: ", this.docRef.id);

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

          <Button onClick={() => this.handleSignUp()} style={{ background: "burlywood", color: "white"}}>Sign Up</Button>
        </form>
        <br />
        <Link to="/login" style={{ textDecoration: 'underline', color: "#555555" }}><p>Click here to login</p></Link>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default Register;

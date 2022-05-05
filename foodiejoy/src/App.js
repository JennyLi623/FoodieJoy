import React, { Component } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

import NavBar from "./pages/NavBar";
import Content from "./pages/Content";
import { doc, getDoc , updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {db} from './service/firebase.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false,
      name: "",
      email: "",
      apiResponse: "",
      userID: "",
      intro: "",
      likedDish: []
    };

  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  handleLogIn = (name, email, userID, intro) => {
    this.setState({ loggedIn: true });
    this.setState({ name: name });
    this.setState({ email: email });
    this.setState({ userID: userID });
    this.setState({intro: intro});
    console.log("handleLogIn" + userID);
    console.log("handleLogIn" + this.state.userID);
  };

  handleLogOut = () => {
    //const { common } = Axios.defaults.headers;
    //Cookies.remove("email");
    //Cookies.remove("session_id");
    //delete common["email"];
    //delete common["session_id"];
    this.setState({ loggedIn: false });
    window.location.href = '/';
  };

  likeDish = async(dishID) => {
    var dishes = this.state.likedDish;
    if (!this.state.likedDish.includes(dishID)) {
      dishes.push(dishID);
      this.setState({likeDish: dishes});
    }
    else{
      dishes = dishes.filter(e => e !== dishID);
      this.setState({likedDish: dishes});
      console.log(dishes);
    }
    console.log(this.state.likedDish);

    const docRef = doc(db, "users", this.state.userID);
    await updateDoc(docRef, {
      dishes: arrayUnion(dishID)
    });
  }


  render() {
    return (
      <div>
        <NavBar handleLogOut={this.handleLogOut} loggedIn={this.state.loggedIn} name={this.state.name} />
        <Content handleLogOut={this.handleLogOut} likedDish={this.state.likedDish} likeDish={this.likeDish} handleLogIn={this.handleLogIn} loggedIn={this.state.loggedIn} name={this.state.name} email={this.state.email} intro={this.state.intro} userID = {this.state.userID}/>
      </div>
    );
  }
}

export default App;

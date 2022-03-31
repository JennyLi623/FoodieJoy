import React, { Component } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

import NavBar from "./pages/NavBar";
import Content from "./pages/Content";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false,
      name: "",
      email: "",
      apiResponse: ""
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

  handleLogIn = (name, email) => {
    //console.log("handleLogIn");
    this.setState({ loggedIn: true });
    this.setState({ name: name });
    this.setState({ email: email });
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

  render() {
    return (
      <div>
        <NavBar handleLogOut={this.handleLogOut} loggedIn={this.state.loggedIn} name={this.state.name} />
        <Content handleLogOut={this.handleLogOut} handleLogIn={this.handleLogIn} loggedIn={this.state.loggedIn} name={this.state.name} email={this.state.email}/>
      </div>
    );
  }
}

export default App;

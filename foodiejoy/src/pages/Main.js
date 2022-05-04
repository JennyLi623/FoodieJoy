import React, { Component } from "react";
import {BrowserRouter, Route,Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './../css/App.css';
import DishList from "./DishList.js";
import SearchBox from './SearchBox';
import foodlist from "./dishes.js";
import Post from "./Post.js";


class Main extends Component {
  constructor(){
    super();
  this.state = {
    name: "",
    password: "",
    loggedIn: 0,
    detail: false,
    postbutton:'',
    searchfield: '',
    dishes:[]
  }
}
  
  handleSubmit = () => {
    const { handleLogIn } = this.props;
    const { name, password } = this.state;
    this.setState({loggedIn: 1});
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  
  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }
  componentDidMount(){
      this.setState({dishes: foodlist});
  }

  render() {
    const { name, password, detail } = this.state;
    // const filteredDishes = this.state.dishes.filter(
    //   dish =>{
    //     return dish.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    //   });
    if (detail === false) {
      return (
        <div>
          <div>
          <h1 id='main-title'>Dishes</h1>
          </div>
        <div>
        <div id='main-bg'>
          <div class="container">
          <div class="row">
            <div class="col">
              Learn more about delicious Dishes
              <SearchBox searchChange={this.onSearchChange}/>
            </div> 

              <div class="col-6">
              </div>

              <div class="col">
              Contribute more delicious Dishes     
              <button className="button" onClick={() => this.handleSubmit()}>Upload Food</button>
              </div>
              </div>

          </div>
                
          <DishList dishes={this.state.dishes}/>
          </div>
        </div>
        </div>
      );
    }
    
  }
}

export default Main;

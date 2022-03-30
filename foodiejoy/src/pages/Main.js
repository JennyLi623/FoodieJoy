import React, { Component } from "react";
import {BrowserRouter, Route,Link} from 'react-router-dom';
import './../css/App.css';
import DishList from "./DishList.js";
import SearchBox from './SearchBox';
import foodlist from "./dishes.js";



class Main extends Component {
  constructor(){
    super();
  this.state = {
    name: "",
    password: "",
    loggedIn: 0,
    detail: false,
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
      console.log(foodlist);
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
          Learn about more delicious Dishes
          </div>
        <div>
              <div id='main-bg'>
                <h1 id='main-title'>Dishes</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <DishList dishes={this.state.dishes}/>
                </div>
        </div>
        </div>
      );
    }
    
  }
}

export default Main;

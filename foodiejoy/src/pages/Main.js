import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import DishList from "./DishList.js";
import SearchBox from './SearchBox';
import foodlist from "./dishes.js";

import Header from './../components/Header/Header';
import Banner from './../components/Banner/Banner';
import Foods from './../components/Foods/Foods';
import FoodDetails from './../components/FoodDetails/FoodDetails';
import Blog from './../components/Blog/Blog';
import Footer from './../components/Footer/Footer';
import NotFound from './../components/NotFound/NotFound';
import SignUp from './../components/SignUp/SignUp';
import SearchResult from './../components/SearchResult/SearchResult';


class Main extends Component {
//function Main() {
  constructor(){
    super();
  this.state = {
    name: "",
    password: "",
    loggedIn: 0,
    detail: false,
    postbutton:'',
    searchfield: '',
    dishes:[],
    likes:[],
    setLikes:[]
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

  render() {

  const {likes, setLikes} = this.state;

  const likesHandler = currentFood => {

    const alreadyAdded = likes.find(item => item.id === currentFood.id)

    if (alreadyAdded) {
      const reaminglikess = likes.filter(item => likes.id !== currentFood)
      setLikes(reaminglikess);
    } else {
      const newlikes = [...likes, currentFood]
      setLikes(newlikes);
    }
  }
  const likesItemHandler = (foodID) => {
      const newlikes = likes.map(item => {
        if (item.id === foodID) {
          item.selected = true;
        }
        return item;
      })
  
      const filteredlikes = newlikes.filter(item => item.selected)
      setLikes(filteredlikes)
    }

  const clearlikes = () => {
    setLikes([]);
  }
    return (
        <Router>
          <Switch>
            <Route exact path="">
              <Header
                likes={likes}
              />
              <Banner />
              <Foods
                likes={likes}
              />
              <Blog />
              <Footer />
            </Route>
  
            <Route path='/food/:id'>
              <Header
                likes={likes}
              />
              <FoodDetails
                likes={likes}
                likesHandler={likesHandler}
              />
              <Footer />
            </Route>
  
            <Route path='/search=:searchQuery'>
              <Header
                likes={likes}
              />
              <Banner />
              <SearchResult />
              <Blog />
              <Footer />
            </Route>
  

            <Route path="*">
              <NotFound />
            </Route>
  
          </Switch>
        </Router>
    );
    }
  }

export default Main;

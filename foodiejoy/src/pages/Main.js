import React, { Component } from "react";
import {BrowserRouter, Route,Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './../css/main.css';
import DishList from "./DishList.js";
import SearchBox from './SearchBox';
import foodlist from "./dishes.js";
import Post from "./Post.js";
import { collection, addDoc, setDoc, updateDoc, getDocs, doc, arrayUnion, arrayRemove, increment, query, where } from "firebase/firestore";
import {db} from './../service/firebase.js';


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
    dishes:[],
    foodlist: [],
    commentslist: [],
    addDish: false,
  }
}

  handleSubmit = () => {
    const { handleLogIn } = this.props;
    const { name, password } = this.state;
    this.setState({loggedIn: 2});
  };

  addLikes = async(commentID) => {
    await updateDoc(doc(db, "comments", commentID),
      {likes: increment(1)
    });
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  // postFood = (event) => {
  //   this.setState({postbutton: event.target.value});
  // }
  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }

  changePostState = () => {
    console.log(this.state.addDish);
    this.setState({addDish: !this.state.addDish});
  }

  componentDidMount(){
      this.setState({dishes: foodlist});
      this.getAllDishes().then(() => {
        console.log(this.state.foodlist);
      });
  }

  getComments = async (dishID) => {
    var templist = this.state.commentslist;
    console.log(this.state.commentslist);
    await getDocs(query(collection(db, "comments"), where("dishID", "==", dishID))).then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      templist.push(tempDoc);
      this.setState({commentslist: templist});
      console.log(this.state.commentslist);
    })
  }

  getAllDishes = async () => {
    var templist = []
    const querySnapshot = await getDocs(collection(db, "dishes"));
    querySnapshot.forEach(async (doc) => {
      templist.push(doc);
    });
      this.setState({foodlist: templist});
      console.log(this.state.foodlist);
      if (this.state.foodlist !== [] ) {
        for(var i = 0; i < this.state.foodlist.length; i++){
          await this.getComments(this.state.foodlist[i].id);
        }
    }
  }

  render() {
    const { name, password, detail } = this.state;
    // const filteredDishes = this.state.dishes.filter(
    //   dish =>{
    //     return dish.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    //   });
    if (detail === false) {
      return (
        <div className="mainpage">
          <div>
            <h1 id='main-title'>Dishes</h1>
          </div>
          <div className='main-bg'>
            <div class="container">
              Learn more about delicious Dishes
              <SearchBox searchChange={this.onSearchChange}/>
            </div>
            <DishList dishes={this.state.foodlist} comments={this.state.commentslist} addLikes={this.addLikes}/>
          </div>
          {this.state.addDish &&
            <Post postbutton={this.postFood} changePostState={this.changePostState}/>
          }
          {!this.state.addDish &&
            <Button className="fixedbutton" onClick={() => this.changePostState()}>
              Add a Dish
            </Button>
        }
        </div>
      );
    }
  }
}

export default Main;

import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import foodpost from "./../static/foodpost.jpeg";
import userpic from "./../static/user.png";
import ReactRoundedImage from "react-rounded-image";
import './../css/user.css';
import DishList from "./DishList.js";
import SearchBox from './SearchBox';
import foodlist from "./dishes.js";
import { collection, addDoc, setDoc, updateDoc,getDoc, getDocs, doc, arrayUnion, arrayRemove, increment, query, where } from "firebase/firestore";
import {db} from './../service/firebase.js';


class User extends Component {
  state = {};
  constructor(){
    super();
  this.state = {
    name: "",
    password: "",
    loggedIn: 0,
    detail: false,
    searchfield: '',
    dishes:[],
    foodlist: [],
    userID: "",
    onlineLikeDish: []
  }
}
  componentDidMount(){
      this.setState({dishes: foodlist});
      //this.getAllDishes().then(() => {
      //  console.log(this.state.foodlist);
      //});
      this.getLikeDish().then(() =>{
        console.log("componentDidMount");
        console.log(this.state.onlineLikeDish);
      });
  }

  getAllDishes = async () => {
    console.log(this.props);
    var templist = []
    const querySnapshot = await getDocs(collection(db, "dishes"));
    querySnapshot.forEach(async (doc) => {
      if (this.props.likedDish.includes(doc.id) ) {
        templist.push(doc);
      }
    });
    this.setState({foodlist: templist});
    console.log(this.state.foodlist);
  }

  getLikeDish = async () => {
    console.log("getLikeDish");
    console.log(this.props);
    const { userID } = this.props;
    console.log(userID);

    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    console.log(docSnap.data());
    var onlineliked = docSnap.data().dishes;
    var templist = []
    const querySnapshot = await getDocs(collection(db, "dishes"));
    console.log("querie" + querySnapshot);
    querySnapshot.forEach(async (doc) => {
      if (onlineliked.includes(doc.id) ) {
        templist.push(doc);
        console.log(doc.id);
      }
    });
    console.log("templist" + templist);
    this.setState({onlineLikeDish: templist});
    console.log(this.state.onlineLikeDish);
  }

  render() {
    const { name, email, userID, intro } = this.props;

    return (
      <div id = "user">
        <Container >
          <Row>
            <Col md="5" >
              <ReactRoundedImage
              image={userpic}
              roundedColor= "#fcf5ed"
              imageWidth="300"
              imageHeight="300"
              roundedSize="5"
              />
            </Col>
            <Col md="5">
              <p className="uname">
                {name}
              </p>
              <p className="uemail">
                {email}
              </p>
              <p className="uintro">
                {intro}
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <p className="title">
            Collected Items
          </p>
        </Container>
        <div>
              <div id='main-bg' className="user-bg">
                <DishList dishes={this.state.onlineLikeDish} likeDish={this.props.likeDish} likedDish={this.props.likedDish} keyword = ""/>
              </div>
        </div>
      </div>

    );
  }
}

export default User;

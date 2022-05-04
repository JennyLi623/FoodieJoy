import React, { Component } from "react";
import './../css/post.css';
import {Link} from 'react-router-dom';
import fastfood from "./../static/fastfood.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './../css/post.css';
import DishNameList from "./DishNameList.js";
import {Container, Row, Col} from 'react-bootstrap';
import {auth} from './../service/firebase.js';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc, setDoc, updateDoc, getDocs, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import {db} from './../service/firebase.js';




class Post extends Component {
  state = {
    dish: "",
    place: "",
    description: "",
    comment: "",
    submit: 0,
    success: 0,
    newfood: true,
    dishID: null,
    addComment: false,
    foodlist: [],
    foodnamelist: []
  };

  componentDidMount() {
    this.getAllDishes();
  }

  getAllDishes = async () => {
    const querySnapshot = await getDocs(collection(db, "dishes"));
    querySnapshot.forEach((doc) => {
      console.log(doc);
      this.state.foodlist.push(doc);
      this.state.foodnamelist.push(doc.data().dish + "-" + doc.data().place);
    });
  }

  handleAddFood = () => {
    const { dish, place, description, comment } = this.state;
    this.addFood({
      dish: dish,
      place: place,
      description: description
    }, comment).then(
      () =>{
        this.props.changePostState();
      }
    );
  };

  handleAddComment = () => {
    const { dishID, comment } = this.state;
    this.addComment(dishID, comment).then(
      () =>{
        this.props.changePostState();
      }
    );
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    if ((name === "dish" || name ==="place") && this.state.addComment === true){
      this.setState({addComment: false});

    }
  };

  addFood = async (data, comment) => {
    this.docRef = await addDoc(collection(db, "dishes"), data).then(async (doc) => {
      await addDoc(collection(db, "comments"), {comment: comment, likes: 0, dishID: doc.id})
    })
  };

  addComment = async (dishID, comment) => {
     await addDoc(collection(db, "comments"), {comment: comment, likes: 0, dishID: dishID})
 };

 autofill = (dish, place, description, id) => {
   this.setState({dish: dish});
   this.setState({place: place});
   this.setState({description: description});
   this.setState({dishID: id});
   this.setState({addComment: true});
 }


  render() {
    const { dish, place, description, foodnamelist, comment, submit, success } = this.state;
    //const cardsArray = foodnamelist.map((d, id) => (
    //  <div className="possibledish" idx={id}>
    //   {d}
    //  </div>
    //));
    return (
      <div>
      <h1 className="login-title">Post Your Dishes Here!!</h1>
      <Container style={{maxWidth: "1000px", padding: "100px 20px"}}>
        <Row>
          <Col md="4">
            <DishNameList dishes={this.state.foodlist} dish={this.state.dish} place={this.state.place} autofill={this.autofill}/>
            <img className="img-fluid" src={fastfood} />
          </Col>
          <Col md="8">
        <form onSubmit={e => { e.preventDefault();}}>
          <TextField
            id="standard-input"
            label="Dish"
            type="text"
            placeholder='Dish'
            name="dish"
            value={dish}
            onChange={this.updateField}
            variant="standard"
            style={{width: "500px"}}
          />
          <br />
          <TextField
            id="standard-input"
            label="Place"
            type="text"
            placeholder='Place'
            name="place"
            value={place}
            onChange={this.updateField}
            variant="standard"
            style={{width: "500px"}}
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-static"
            type="text"
            label="description"
            placeholder='Write a description about the food'
            name="description"
            value={description}
            onChange={this.updateField}
            variant="standard"
            style={{width: "500px"}}
            multiline
            rows={4}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-static"
            type="text"
            label="comment"
            placeholder='Write a brief comment about the food'
            name="comment"
            value={comment}
            onChange={this.updateField}
            variant="standard"
            style={{width: "500px"}}
            multiline
            rows={6}
            variant="outlined"
          />
          <br />
          <br />


        {!this.state.addComment &&
            <Button onClick={() => this.handleAddFood()} style={{ background: "burlywood", color: "white"}}>Post your Dish</Button>
        }
        {this.state.addComment &&
            <Button onClick={() => this.handleAddComment()} style={{ background: "burlywood", color: "white"}}>Add the Comment</Button>
        }
        </form>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default Post;

import React, { Component } from "react";
import {Link} from 'react-router-dom';
import RecipeReviewCard from "./card.js";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



const DishList = ({ dishes, comments, addLikes, likeDish, likedDish, keyword }) => {
  console.log(keyword);
  const cardsArray = dishes.filter(doc => (doc.data().dish.toLowerCase().includes(keyword) || doc.data().place.toLowerCase().includes(keyword))).map((doc, idx) => (
    <Grid item xs={4}>
    <RecipeReviewCard
      dish={doc.data().dish}
      dishID={doc.id}
      place={doc.data().place}
      description={doc.data().description}
      comments={comments}
      fidx = {idx}
      url='https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150'
      likeDish={likeDish}
      likedDish={likedDish}
      addLikes={addLikes}/>
      </Grid>
  ));
  return (
    <div className="block">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      {cardsArray}
      </Grid>
      </Box>
    </div>
  );
};
export default DishList;

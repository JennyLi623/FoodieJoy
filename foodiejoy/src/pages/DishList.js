import React, { Component } from "react";
import {Link} from 'react-router-dom';
import RecipeReviewCard from "./card.js";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



const DishList = ({ dishes }) => {
  console.log(dishes);
  const cardsArray = dishes.map(dish => (
    <Grid item xs={4}>
    <RecipeReviewCard
      name={dish.name}
      description={dish.description}
      url={dish.url} />
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

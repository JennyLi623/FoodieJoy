import React, { Component } from "react";

const DishNameList = ({ dishes,  dish, place, autofill}) => {
  const cardsArray = dishes.map(doc => (
    <div>
    {doc.data().dish.includes(dish) && doc.data().place.includes(place) &&
      <div  className="possibledish" onClick={()=>autofill(doc.data().dish, doc.data().place, doc.data().description, doc.id)}>
      {doc.data().dish + " - " + doc.data().place}
    </div>
  }
  </div>
  ));

  return (
    <div>
      <p>Potential Dishes</p>
      {cardsArray}
    </div>
  );
};
export default DishNameList;

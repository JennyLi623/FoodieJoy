import React, { Component } from "react";

const DishNameList = ({ comments }) => {
  const cardsArray = comments.map(obj => (
      <div  className="possibledish" }>
      {doc.data().dish + " - " + doc.data().place}
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

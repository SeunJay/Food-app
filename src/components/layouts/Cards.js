import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addFood } from "./cartHelpers";

export default function Cards({ food, showViewFoodButton = true }) {
  const [redirect, setRedirect] = useState(false);
  const showViewButton = showViewFoodButton => {
    return (
      showViewFoodButton && (
        <button className="btn btn-outline-primary mt-2 mb-2">View Food</button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of stock</span>
    );
  };


  //console.log(food);

  const addToCart = food => {
    addFood(food, () => {
      setRedirect(true);
    });
  };
  

  const shouldRedirect = redirect => {
    if(redirect) {
      return <Redirect to="/cart"/>
    }
  }


  return (
    <div className="card">
      <div className="card-header">{food.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={food} url="food" />
        <p className="lead mt-2">{food.description.substring(0, 50)}</p>
        <p className="black-9">${food.price}</p>
        <p className="black-8">
          Category: {food.category && food.category.name}
        </p>
        <p className="black-8">Add on {moment(food.createdAt).fromNow()}</p>
        {showStock(food.quantity)}
        <br />
        <Link to={`/food/${food._id}`}>
          {showViewButton(showViewFoodButton)}
        </Link>
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

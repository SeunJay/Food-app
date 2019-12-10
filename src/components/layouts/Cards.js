import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addFood, updateItem, removeItem } from "./cartHelpers";

export default function Cards({
  food,
  showViewFoodButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveFoodButton = false,
  setRun = f => f, // default value of function
  run = undefined
}) {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(food.count);
  const [isInStock, setIsInStock] = useState(true);
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/food/${food._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  console.log(food);

  const showRemoveButton = showRemoveFoodButton =>
    showRemoveFoodButton && (
      <button
        onClick={() => {
          removeItem(food._id);
          setRun(!run);
        }}
        className="btn btn-outline-warning mt-2 mb-2"
      >
        Remove from orders
      </button>
    );

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of stock</span>
    );
  };

  const addToCart = () => {
    addFood(food, () => {
      setRedirect(true);
    });
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          // disabled={showButton
          // }
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Make order
        </button>
      )
    );
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Choose Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(food._id)}
          />
        </div>
      )
    );
  };

  const handleChange = foodId => event => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(foodId, event.target.value);
    }
  };

  return (
    <div className="card p-0 w-75">
      <div className="card-header">{food.name}</div>
      <div className="card-body p-0">
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
        {showViewButton(showViewFoodButton)}

        {isInStock ? showAddToCart(showAddToCartButton) : null}

        {showRemoveButton(showRemoveFoodButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
}

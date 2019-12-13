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
          <button className="btn btn-outline-primary mt-2 mb-1">
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
        className="btn btn-outline-warning mt-2 mb-1"
      >
        Remove
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
          className="btn btn-outline-warning mt-2 mb-1"
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
        <div className="input-group mb-1">
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
    // <div className="card p-0 w-75">
    //   <div className="card-header">{food.name}</div>
    //   <div className="card-body p-3">
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={food} url="food" />
    //     <p className=" mt-2">{food.description.substring(0, 50)}</p>
    //     <p className="black-9">Price: ${food.price}</p>
    //     <p className="black-8">
    //       Category: {food.category && food.category.name}
    //     </p>
    //     <p className="black-8">Added {moment(food.createdAt).fromNow()}</p>
    //     {showStock(food.quantity)}
    //     <br />
    //     {showViewButton(showViewFoodButton)}

    //     {isInStock ? showAddToCart(showAddToCartButton) : null}

    //     {showRemoveButton(showRemoveFoodButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>




    <div className="card mb-3 shadow" style={{maxWidth: "1000px"}}>
  <div className="row no-gutters">
    <div className="col-md-4" style={{height: "100%"}}>
      <ShowImage item={food} url="food" />
    </div>
    <div className="col-10">
      <div className="p-2">
        <h5 className="card-title mt-0">{food.description.substring(0, 50)}</h5>
        <p className="card-text"></p>
        {showStock(food.quantity)}
        <br />
        {showViewButton(showViewFoodButton)}

        {isInStock ? showAddToCart(showAddToCartButton) : null}

        {showRemoveButton(showRemoveFoodButton)}

        {showCartUpdateOptions(cartUpdate)}
        <p className="card-text"><small className="text-muted">Added {moment(food.createdAt).fromNow()}</small></p>

      </div>
    </div>
  </div>
</div>
  );
}

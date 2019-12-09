import React, { useState, useEffect, Fragment } from "react";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
//import NavBar from "./NavBar";
import Cards from "./Cards";
import DashboardNav from "./DashboardNav";
import Checkout from "./Checkout";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showFood = items => {
    return (
      <div>
        <h3 className="text-center">
          You have made {`${items.length}`} order(s)
        </h3>
        {items.map((food, i) => (
          <Cards
            key={i}
            food={food}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveFoodButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noFoodMessage = () => (
    <h3 className="text-warning ml-3">
      You have not made any orders presently
    </h3>
  );

  return (
    <Fragment>
      <DashboardNav />
      <Link className="btn btn-outline-warning mt-3 mx-4" to="/userdashboard">
        Go Back
      </Link>
      <h1 className="text-center">Order Page</h1>
      <div className="row">
        <div className="col-4">
          {items.length > 0 ? showFood(items) : noFoodMessage()}
        </div>
        <div className="col-6">
          <h3 className="mb-4">Your Order summary</h3>
          
          <div class="container">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              {items.map((item, i) => (
                <tbody>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <Checkout foods={items} />
        </div>
      </div>
    </Fragment>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import "./dashboard.css";
import { getFoods } from "./apiLayout";
import { getPurchaseHistory } from "../../user/apiuser";
import Cards from "./Cards";
import DashboardNav from "./DashboardNav";
import moment from "moment";

function UserDashboard() {
  const [foodByArrival, setFoodByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState([]);

  const loadFoodsByArrival = () => {
    getFoods("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFoodByArrival(data);
      }
    });
  };

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  console.log(history);

  useEffect(() => {
    init(_id, token);
  }, []);

  useEffect(() => {
    loadFoodsByArrival();
  }, []);

  const {
    user: { _id, name, businessEmail, role }
  } = isAuthenticated();

  const token = isAuthenticated().token;

  console.log(history);

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header" style={{ textAlign: "center" }}>
          User Links
        </h4>
        <ul className="list-group">
          <li className="list-group-item" style={{ textAlign: "center" }}>
            <Link className="nav-link" to="/cart">
              My Orders
            </Link>
          </li>
          <li className="list-group-item" style={{ textAlign: "center" }}>
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header" style={{ textAlign: "center" }}>
          User Information
        </h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{businessEmail}</li>
          <li className="list-group-item">{role === 1 ? "Admin" : "User"}</li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = history => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Order history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div key={i}>
                  
                  <hr />
                  {h.foods.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <DashboardNav cart={true} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">{userLinks()}</div>
          <div className="col-9">
            {userInfo()}
            {purchaseHistory(history)}
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Products
        </h4>
        <div className="row">
          {foodByArrival.map((food, i) => (
            <div className="col-4 mb-4" key={i}>
              <Cards food={food} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;

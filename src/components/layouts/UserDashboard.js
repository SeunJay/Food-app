import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import { signout } from "../../auth";
import "./dashboard.css";
import { getFoods } from "./apiLayout";
import Cards from "./Cards";

function UserDashboard({ history }) {
  const [foodByArrival, setFoodByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadFoodsByArrival = () => {
    getFoods("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFoodByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadFoodsByArrival();
  }, []);

  console.log(foodByArrival);

  const {
    user: { firstName, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header" style={{ textAlign: "center" }}>
          User Links
        </h4>
        <ul className="list-group">
          <li className="list-group-item" style={{ textAlign: "center" }}>
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item" style={{ textAlign: "center" }}>
            <Link className="nav-link" to="/profile/update">
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
          <li className="list-group-item">{firstName}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? "Admin" : "User"}</li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header" style={{ textAlign: "center" }}>
          Purchase
        </h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-warning mb-3 py-0">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            // style={isActive(history, "/")}
          >
            Dashboard
          </Link>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {/* <Link to="/" className="nav-link" style={{ fontWeight: "800" }}>
                <i className="fas fa-home" /> Home
              </Link> */}
              </li>
              <li className="nav-item">
                <span
                  to="/signin"
                  className="nav-link"
                  // style={isActive(history, "/signin")}
                  style={{ fontWeight: "800" }}
                >
                  <i className="fas fa-plus" />
                  Hello {firstName}
                </span>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  // style={isActive(history, "/signup")}
                  style={{ fontWeight: "800" }}
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  <i className="fas fa-question" /> Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">{userLinks()}</div>
          <div className="col-9">
            {userInfo()}
            {purchaseHistory()}
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          See Foods
        </h4>
        <div className="row">
          {foodByArrival.map((food, i) => (
            <Cards key={i} food={food} />
          ))}
        </div>
      </div>
    </>
  );
}

export default withRouter(UserDashboard);

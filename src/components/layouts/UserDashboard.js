import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import "./dashboard.css";
import { getFoods } from "./apiLayout";
import Cards from "./Cards";
import DashboardNav from "./DashboardNav";
import moment from "moment";

function UserDashboard() {

  const {
    user: { _id, name, businessEmail, role }
  } = isAuthenticated();

  const token = isAuthenticated().token;


  const userLinks = () => {
    return (
      <div className="card ml-3">
        <h4
          className="card-header bg-warning text-center"
          style={{ color: "#fff" }}
        >
          User Links
        </h4>
        <ul className="list-group">
          <li className="list-group-item" style={{ textAlign: "center" }}>
            <Link className="nav-link text-warning text-center" to="/cart">
              My Orders
            </Link>
          </li>
          <li className="list-group-item" style={{ textAlign: "center" }}>
            <Link
              className="nav-link text-warning text-center"
              to={`/profile/${_id}`}
            >
              Update Profile
            </Link>
          </li>
          <li className="list-group-item" style={{ textAlign: "center" }}>
            <Link
              className="nav-link text-warning text-center"
              to="/dashboard/products"
            >
              View Products
            </Link>
          </li>
          <li className="list-group-item" style={{ textAlign: "center" }}>
            <Link
              className="nav-link text-warning text-center"
              to="/dashboard/orderhistory"
            >
              Order History
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

  return (
    <>
      <DashboardNav cart={true} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">{userLinks()}</div>
          <div className="col-9">
            {userInfo()}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;

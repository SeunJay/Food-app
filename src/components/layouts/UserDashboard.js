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
  <div className="row">
    <nav className="col-9 d-none d-md-block bg-light sidebar sidenav-top">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="#">
              <span data-feather="home"></span>
              Dashboard <span className="sr-only">(current)</span>
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/cart">
							<span data-feather="file"></span>
							Orders
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={`/profile/${_id}`}>
							<span data-feather="shopping-cart"></span>
							Update Profile
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/dashboard/products">
							<span data-feather="users"></span>
							View Products
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/dashboard/orderhistory">
							<span data-feather="bar-chart-2"></span>
							Order History
						</Link>
					</li>
				</ul>
			</div>
		</nav>
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
          <div className="col-9 mt-5">
            {userInfo()}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
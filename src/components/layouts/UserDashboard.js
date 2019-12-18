import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import "./dashboard.css";
import DashboardNav from "./DashboardNav";
import { getPurchaseHistory } from "../../user/apiuser";
import { getFoods } from "./apiLayout";
import moment from "moment";
// import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";

function UserDashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [foodByArrival, setFoodByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadFoodsByArrival = () => {
    getFoods("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFoodByArrival(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadFoodsByArrival();
  }, []);

  const {
    user: { _id, name, businessEmail, role }
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="row">
        <nav className="col-8 d-none d-md-block bg-light sidebar sidenav-top">
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
                  Your cart
                </Link>
              </li>
              {/*<li className="nav-item">
						<Link className="nav-link" to={`/profile/${_id}`}>
							<span data-feather="shopping-cart"></span>
							Update Profile
						</Link>
            </li>*/}
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

  console.log(history);

  const userInfo = () => {
    return (
      <>
        <div className="card mb-5 shadow">
          <h3 className="card-header" style={{ textAlign: "center" }}>
            Your Dashboard
          </h3>
          <ul className="list-group">
            <li className="list-group-item">{name}</li>
            <li className="list-group-item">{businessEmail}</li>
            <li className="list-group-item">
              {role === 1 ? "Manufacturer" : "Distributor"}
            </li>
          </ul>
        </div>

        <div className="content">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card card-stats shadow">
                <div className="card-body ">
                  <div className="row">
                    <div className="col-12 text-center">
                      <div className="numbers" style={{ fontWeight: "800" }}>
                        <p className="card-category">Total Orders</p>
                        <h3 className="card-title">{history.length}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer ">
                  <Link className="stats text-warning" to="/cart">
                    See more
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card card-stats shadow">
                <div className="card-body ">
                  <div className="row">
                    <div className="col-12 text-center">
                      <div className="numbers" style={{ fontWeight: "800" }}>
                        <p className="card-category">Last Order</p>
                        <h5 className="card-title">
                          {moment(history.updatedAt).fromNow()}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer ">
                  <Link
                    className="stats text-warning"
                    to="/dashboard/orderhistory"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card card-stats shadow">
                <div className="card-body ">
                  <div className="row">
                    <div className="col-12 text-center">
                      <div className="numbers" style={{ fontWeight: "800" }}>
                        <p className="card-category">Available Products</p>
                        <h3 className="card-title">{foodByArrival.length}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer ">
                  <Link className="stats text-warning" to="/dashboard/products">
                    See more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <DashboardNav cart={true} />
      <div className="container-fluid">
        <div className="row bg-c">
          <div className="col-3">{userLinks()}</div>
          <div className="col-8 mt-4">{userInfo()}</div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import "./dashboard.css";
import "./orderHistory.css";
import { getPurchaseHistory } from "../../user/apiuser";
import DashboardNav from "./DashboardNav";
import Spinner from "./Spinner";

function OrderHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const {
    user: { _id, name, businessEmail, role }
  } = isAuthenticated();

  const token = isAuthenticated().token;

  console.log(history);

  const userLinks = () => {
    return (
      <div className="row">
        <nav className="col-8 d-none d-md-block bg-light sidebar sidenav-top">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/userdashboard">
                  <span data-feather="home"></span>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/cart">
                  <span data-feather="file"></span>
                  Your cart <span className="sr-only">(current)</span>
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
                <Link className="nav-link active" to="#">
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

  const purchaseHistory = history => {
    return (
      <>
        {history.length === 0 ? (
          <h3>You have no order history yet</h3>
        ) : (
          <div className="card mb-5">
            <h3 className="card-header text-center">Order history</h3>
            <ul className="list-group">
              <li className="list-group-item">
                {history.map((h, i) => {
                  return (
                    <div key={i}>
                      <hr />

                      <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                          </tr>
                        </thead>
                        {h.foods.map((p, i) => (
                          <tbody key={i}>
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{p.name}</td>
                              <td>${p.price}</td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <DashboardNav cart={true} />
      <div className="d-flex flex-row bg-c">
        <div className="col-3">{userLinks()}</div>
        <div className="container-fluid">
          {/*<Link
          className="btn btn-outline-warning mt-3 mx-4 mb-4"
          to="/userdashboard"
        >
          Go Back
  </Link>*/}
          <div className="row">
            {/* <div className="col-3">{userLinks()}</div> */}
            <div className="col-md-8 offset-md-2">
              {/* {userInfo()} */}
              {loading ? <Spinner /> : purchaseHistory(history)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;

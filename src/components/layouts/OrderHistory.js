import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import "./dashboard.css";
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
                      // <div key={i}>
                      //   <h6>Product name: {p.name}</h6>
                      //   <h6>Product price: ${p.price}</h6>
                      // </div>
                      <table className="table" key={i}>
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                          </tr>
                        </tbody>
                      </table>
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
        <Link
          className="btn btn-outline-warning mt-3 mx-4 mb-4"
          to="/userdashboard"
        >
          Go Back
        </Link>
        <div className="row">
          {/* <div className="col-3">{userLinks()}</div> */}
          <div className="col-md-8 offset-md-2">
            {/* {userInfo()} */}
            {loading ? <Spinner /> : purchaseHistory(history)}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;

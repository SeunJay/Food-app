import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import { signout } from "../../auth";
import "./dashboard.css";
import capitalize from "../../user/capitalize" 

function AdminDashboard({ history }) {
  const {
    user: { name, businessEmail, role }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card ml-3">
        <h4
          className="card-header bg-warning text-center"
          style={{ color: "#fff" }}
        >
          Admin Links
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              className="nav-link text-warning text-center"
              to="/create/category"
            >
              Add Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-warning text-center"
              to="/create/product"
            >
              Add Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-warning text-center"
              to="/admin/orders"
            >
              View Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-warning text-center"
              to="/admin/products"
            >
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
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
      <nav className="navbar navbar-expand-sm navbar-dark mb-3 py-0" style={{backgroundColor:"#DD4F05"}}>
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            // style={isActive(history, "/")}
            style={{fontSize:"2rem", fontWeight: "700"}}
          >
            Paystand
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
                  // style={{ fontWeight: "800" }}
                >
                  <i className="fas fa-plus" />
                  Hello {capitalize(name)}
                </span>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  // style={isActive(history, "/signup")}
                  // style={{ fontWeight: "800" }}
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
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </>
  );
}

export default withRouter(AdminDashboard);

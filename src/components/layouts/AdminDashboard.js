import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import { signout } from "../../auth";
import "./dashboard.css";

function AdminDashboard({ history }) {
  const {
    user: { firstName, email, role }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">Create Category</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Food
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
          <li className="list-group-item">{firstName}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? "Admin" : "User"}</li>
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
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">
          {adminInfo()}
        </div>
      </div>
    </>
  );
}

export default withRouter(AdminDashboard);
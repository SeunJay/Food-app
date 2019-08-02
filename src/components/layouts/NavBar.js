import React from "react";
import { Link } from "react-router-dom";

function NavBar({ brand }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-warning mb-3 py-0 sticky-top">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand"
          // style={isActive(history, "/")}
        >
          {brand}
        </Link>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ fontWeight: "800" }}>
                <i className="fas fa-home" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signin"
                className="nav-link"
                // style={isActive(history, "/signin")}
                style={{ fontWeight: "800" }}
              >
                <i className="fas fa-plus" /> Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-link"
                // style={isActive(history, "/signup")}
                style={{ fontWeight: "800" }}
              >
                <i className="fas fa-question" /> Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

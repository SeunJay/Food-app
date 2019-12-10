import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import "./Navbar.css";

function NavBar({ brand, history }) {
  return (
    <nav className="navbar-gt navbar navbar-expand-sm navbar-dark mb-3 py-0 sticky-top">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand text-bold"
          // style={isActive(history, "/")}
        >
          {brand}
        </Link>
        <div>
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to="/" className="nav-link" style={{ fontWeight: "800" }}>
                <i className="fas fa-home" /> Home
              </Link>
            </li> */}
            {!isAuthenticated() && (
              <React.Fragment>
                <div>
                  <li
                    className="nav-item text-light"
                    style={{ display: "inline-Block" }}
                  >
                    <Link
                      to="/signin"
                      className="nav-link"
                      // style={isActive(history, "/signin")}
                      // style={{ fontWeight: "800" }}
                    >
                      Sign In
                    </Link>
                  </li>
                  <li
                    className="nav-item text-light"
                    style={{ display: "inline-Block" }}
                  >
                    <Link
                      to="/signup"
                      className="nav-link"
                      // style={isActive(history, "/signup")}
                      // style={{ fontWeight: "800" }}
                    >
                      Sign Up
                    </Link>
                  </li>
                  {/*<li
                    className="nav-item"
                    style={{ display: "inline-Block" }}
                  >
                    <Link
                      to="/shop"
                      className="nav-link"
                      // style={isActive(history, "/signup")}
                      style={{ fontWeight: "800" }}
                    >
                      <i className="fas fa-question" /> Shop
                    </Link>
                  </li>*/}
                </div>
              </React.Fragment>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  to="/signup"
                  className="nav-link"
                  // style={isActive(history, "/signup")}
                  style={{ fontWeight: "800", cursor: "pointer" }}
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  Sign Out
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(NavBar);

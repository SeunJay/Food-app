import React from "react";
import { isAuthenticated } from "../../auth/index";
import { Link, withRouter } from "react-router-dom";
import { foodTotal } from "./cartHelpers";
import Cart from "./Cart";
import { signout } from "../../auth";
import capitalize from "../../user/capitalize";

function DashboardNav({ history, cart }) {
  const {
    user: { name, businessEmail }
  } = isAuthenticated();
  console.log(cart);
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark mb-3 py-0 sticky-top" style={{backgroundColor:"#DD4F05"}}>
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            // style={isActive(history, "/")}
            style={{fontSize:"2rem", fontWeight: "700"}}
          >
            Paystand.
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
                  {`Hello ${capitalize(name)}`}
                </span>
              </li>
              {cart && (
                <li className="nav-item">
                  <Link
                    to="/cart"
                    className="nav-link"
                    // style={isActive(history, "/signup")}
                    // style={{ fontWeight: "800" }}
                  >
                    <i className="fas fa-question" /> Order{" "}
                    <sup>
                      <small className="cart-badge">{foodTotal()}</small>
                    </sup>
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  to="/"
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
    </>
  );
}

export default withRouter(DashboardNav);

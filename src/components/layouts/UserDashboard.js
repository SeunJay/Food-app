import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

export default function UserDashboard() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-warning mb-3 py-0">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            // style={isActive(history, "/")}
          />
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {/* <Link to="/" className="nav-link" style={{ fontWeight: "800" }}>
                <i className="fas fa-home" /> Home
              </Link> */}
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  // style={isActive(history, "/signin")}
                  style={{ fontWeight: "800" }}
                >
                  <i className="fas fa-plus" />
                  User Email
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signout"
                  className="nav-link"
                  // style={isActive(history, "/signup")}
                  style={{ fontWeight: "800" }}
                >
                  <i className="fas fa-question" /> Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="sidebar">
        <a class="active" href="#home">
          Home
        </a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>

      <div class="content">
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>

        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>

        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>

        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
        <p>Seun Jayeoba</p>
      </div>
    </>
  );
}

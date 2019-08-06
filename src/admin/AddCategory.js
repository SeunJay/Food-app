import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { Link, withRouter } from "react-router-dom";
import { signout } from "../auth";

function AddCategory({ history }) {
  const [name, setName] = useState("");
  const [error, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = event => {
    setErrors("");
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors("");
    setSuccess(false);
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            value={name}
          />
        </div>
        <button className="btn btn-outline-warning">Create Category</button>
      </form>
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
                  Hello {user.firstName}
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
        <Link className="btn btn-outline-warning" to="/admindashboard">Go Back</Link>
        <div className="col-md-8 offset-md-2 mt-5">{newCategoryForm()}</div>
      </div>
    </>
  );
}

export default withRouter(AddCategory);

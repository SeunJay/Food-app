import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { Link, withRouter } from "react-router-dom";
import { signout } from "../auth";
import { createCategory } from "./apiAdmin";

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
    //make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setErrors(true);
      } else {
        setErrors("");
        setName("");
        setSuccess(true);
      }
      
    });
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Category Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-warning">Create Category</button>
      </form>
    );
  };

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrors("");
    }, 5000);
  };

  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  };

  const showSuccess = () => {
    clearSuccessMessage();
    if (success) {
      return (
        <h3 className="text-success center" style={{ textAlign: "center" }}>
          New category successfully created
        </h3>
      );
    }
  };

  const showError = () => {
    clearErrorMessage();
    if (error) {
      return (
        <h3 className="text-danger center" style={{ textAlign: "center" }}>
          Category should be unique
        </h3>
      );
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-dark mb-3 py-0 sticky-top"
        style={{ backgroundColor: "#DD4F05" }}
      >
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            style={{ fontWeight: "800", fontSize: "2rem" }}
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
                  Hello {user.name}
                </span>
              </li>
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
      <Link className="btn btn-outline-warning mt-3 mx-4" to="/admindashboard">
        Go Back
      </Link>
      {showSuccess()}
      {showError()}
      <div className="row">
        <div className="col-md-8 offset-md-2 mt-5">{newCategoryForm()}</div>
      </div>
    </>
  );
}

export default withRouter(AddCategory);

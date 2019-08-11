import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { isAuthenticated } from "../../auth/index";
import { Link } from "react-router-dom";
import { readUser, update, updateUser } from "../../user/apiuser";

export default function Profile({ match }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    error: false,
    success: false
  });

  const { firstName, lastName, password, error, success } = values;

  const { token } = isAuthenticated();

  const init = userId => {
    readUser(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = event => {};

  const handleSubmit = event => {
    event.preventDefault();
  };

  const profileUpdate = (firstName, lastName, password) => {
    return (
      <div className="container col-md-8 offset-md-2">
        <div className="card mb-3">
          <div className="card-header text-center">Update profile</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="" className="text-muted">
                  Firt Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange("firstName")}
                  value={values.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="text-muted">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange("lastName")}
                  value={values.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="text-muted">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange("password")}
                  value={values.password}
                />
              </div>
              <button className="btn btn-warning">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavBar brand="Omnifood" />
      <h2 className="mb-4 text-center">Profile Update</h2>
      {profileUpdate()}
    </div>
  );
}

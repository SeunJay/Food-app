import React, { useState } from "react";
//import TextField from "../layouts/TextField";
import { Link } from "react-router-dom";
import NavBar from "../../components/layouts/NavBar";
import {signup} from "../../auth"

export default function Signup() {
  console.log(process.env.REACT_APP_API_URL);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const { firstName, lastName, email, password, success, error } = values;

  

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ firstName, lastName, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {values.error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        You have successfully created an account. Please <Link to="/signin" className="text-warning">signin</Link>
      </div>
    );
  };

  return (
    <>
      <NavBar brand="Omnifood" />
      <div className="container col-md-8 offset-md-2">
        <div className="card mb-3">
          {showError()}
          {showSuccess()}
          <div className="card-header text-center">Sign up</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-warning">First Name</label>
                <input
                  onChange={handleChange("firstName")}
                  type="text"
                  className="form-control"
                  value={values.firstName}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Last Name</label>
                <input
                  onChange={handleChange("lastName")}
                  type="text"
                  className="form-control"
                  value={values.lastName}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Email</label>
                <input
                  onChange={handleChange("email")}
                  type="email"
                  className="form-control"
                  value={values.email}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Password</label>
                <input
                  onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                  value={values.password}
                />
              </div>
              <button
                className="btn btn-warning"
                style={{ color: "#fff" }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {JSON.stringify(values)}
      </div>
    </>
  );
}

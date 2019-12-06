import React, { useState } from "react";
//import TextField from "../layouts/TextField";
import { Link } from "react-router-dom";
import NavBar from "../../components/layouts/NavBar";
import {signup} from "../../auth"

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    businessName: "",
    businessAddress: "",
    businessEmail: "",
    businessPhone: "",
    country: "",
    state: "",
    city: "",
    about: "",
    password: "",
    error: "",
    success: false
  });

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const {
    name,
    businessName,
    businessAddress,
    businessEmail,
    businessPhone,
    country,
    state,
    city,
    about,
    password,
    success,
    error
  } = values;

  

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({
      name,
      businessName,
      businessAddress,
      businessEmail,
      businessPhone,
      country,
      state,
      city,
      about,
      password
    }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          businessName: "",
          businessAddress: "",
          businessEmail: "",
          businessPhone: "",
          country: "",
          state: "",
          city: "",
          about: "",
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
                <label className="text-warning">Name</label>
                <input
                  onChange={handleChange("name")}
                  type="text"
                  className="form-control"
                  value={values.name}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Business Name</label>
                <input
                  onChange={handleChange("businessName")}
                  type="text"
                  className="form-control"
                  value={values.businessName}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Business Address</label>
                <input
                  onChange={handleChange("businessAddress")}
                  type="text"
                  className="form-control"
                  value={values.businessAddress}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Business Email</label>
                <input
                  onChange={handleChange("businessEmail")}
                  type="text"
                  className="form-control"
                  value={values.businessEmail}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Business Phone</label>
                <input
                  onChange={handleChange("businessPhone")}
                  type="text"
                  className="form-control"
                  value={values.businessPhone}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Country</label>
                <input
                  onChange={handleChange("country")}
                  type="text"
                  className="form-control"
                  value={values.country}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">State</label>
                <input
                  onChange={handleChange("state")}
                  type="text"
                  className="form-control"
                  value={values.state}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">City</label>
                <input
                  onChange={handleChange("city")}
                  type="text"
                  className="form-control"
                  value={values.city}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">About</label>
                <input
                  onChange={handleChange("about")}
                  type="text"
                  className="form-control"
                  value={values.about}
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

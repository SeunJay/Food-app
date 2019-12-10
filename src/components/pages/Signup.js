import React, { useState } from "react";
//import TextField from "../layouts/TextField";
import { Link } from "react-router-dom";
import NavBar from "../../components/layouts/NavBar";
import {signup} from "../../auth";
import "./Signup.css";

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
        console.log(values)
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
        You have successfully created an account. Please <Link to="/signin" className="text-warning">Sign In</Link>
      </div>
    );
  };

  return (
    <>
      <NavBar brand="Paystand." />
      <div className="div-wrapper">
      <div className="container col-md-9">
        <div className="mb-3 shadow rounded my-lg-5">
          {showError()}
          {showSuccess()}
          <div className="card-header bg-white text-center"><strong>CREATE A FREE MERCHANT ACCOUNT</strong></div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
            <div className="row">
            <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("name")}
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={values.name}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("businessName")}
                  type="text"
                  className="form-control"
                  placeholder="Business Name"
                  value={values.businessName}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("businessAddress")}
                  type="address"
                  className="form-control"
                  placeholder="Business Address"
                  value={values.businessAddress}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("businessEmail")}
                  type="email"
                  className="form-control"
                  placeholder="Business Email"
                  value={values.businessEmail}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("businessPhone")}
                  type="tel"
                  className="form-control"
                  placeholder="Business Phone"
                  value={values.businessPhone}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("country")}
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value={values.country}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("state")}
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={values.state}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("city")}
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={values.city}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("about")}
                  type="text"
                  className="form-control"
                  placeholder="About Your Business"
                  value={values.about}
                />
              </div>

              <div className="form-group col-md-6 mb-4">
                <input
                  onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={values.password}
                />
              </div>
              </div>
              <div style={{textAlign: "center"}}>
              <button
                className="btn btn-create btn-warning"
                style={{ color: "#fff" }}
                type="submit"
              >
                Create Account
              </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mb-5 text-info" style={{ textAlign: "center" }}>
          Already have a merchant account? <Link to="/signin" style={{color: "#DD4F05"}}>Sign In</Link>
        </div>

        {JSON.stringify(values)}
      </div>
      </div>
    </>
  );
}

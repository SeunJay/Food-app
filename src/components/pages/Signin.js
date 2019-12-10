import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/layouts/NavBar";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../../auth";
import "./Signin.css";
import Spinner from "../layouts/Spinner";

export default function Signin() {
  const [values, setValues] = useState({
    businessEmail: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const {
    businessEmail,
    password,
    loading,
    error,
    redirectToReferrer
  } = values;

  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ businessEmail, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
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

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <Spinner />
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admindashboard" />;
      } else {
        return <Redirect to="/userdashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      <NavBar brand="Paystand." />
      <div className="div-wrapper1">
      <div className="container col-md-6">
        <div className="mb-3 shadow rounded my-lg-5">
          {showLoading()}
          <div className="card-header bg-white text-center"><strong>SIGN INTO YOUR DASHBOARD</strong></div>
          <div className="card-body">
            {showError()}
            {redirectUser()}
            <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                <input
                  onChange={handleChange("businessEmail")}
                  type="email"
                  className="form-control"
                  placeholder="Business Email"
                  value={values.businessEmail}
                  name="email"
                />
              </div>

                <div className="form-group mb-4">
                  <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={values.password}
                    name="password"
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                <button className="btn btn-sign btn-warning" style={{ color: "#fff" }}>
                Sign In
              </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mb-5 text-info" style={{ textAlign: "center" }}>
            Don't have a merchant account?{" "}
            <Link to="/signup" style={{ color: "#DD4F05" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

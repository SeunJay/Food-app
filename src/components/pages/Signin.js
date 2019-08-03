import React, { useState } from "react";
import NavBar from "../../components/layouts/NavBar";
import { Redirect } from "react-router-dom";
import { signin } from "../../auth";

export default function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          redirectToReferrer: true
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
          <h2>LOADING...</h2>
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      <NavBar brand="Omnifood" />
      <div className="container">
        <div className="card mb-3">
          <div className="card-header text-center">Sign in</div>
          <div className="card-body">
            {showError()}
            {showLoading()}
            {redirectUser()}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-warning">Email</label>
                <input
                  onChange={handleChange("email")}
                  type="email"
                  className="form-control"
                  value={values.email}
                  name="email"
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Password</label>
                <input
                  onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                  value={values.password}
                  name="password"
                />
              </div>
              <button className="btn btn-warning" style={{ color: "#fff" }}>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

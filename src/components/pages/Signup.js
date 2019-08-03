import React, { useState } from "react";
//import TextField from "../layouts/TextField";
import NavBar from "../../components/layouts/NavBar";
import { API } from "../../config";

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

  const { firstName, lastName, email, password } = values;

  const signup = user => {
    //console.log(firstName, lastName, email, password)
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => {
      return res.json()
    }).catch(err=>console.log(err))
  };

  const handleSubmit = event => {
    event.preventDefault();
    signup({firstName, lastName, email, password})
  
  };

  return (
    <>
      <NavBar brand="Omnifood" />
      <div className="container col-md-8 offset-md-2">
        <div className="card mb-3">
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
        {API}
        {JSON.stringify(values)}
      </div>
    </>
  );
}

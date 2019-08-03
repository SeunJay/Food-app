import React from "react";
//import TextField from "../layouts/TextField";
import NavBar from "../../components/layouts/NavBar";
import {API} from "../../config"

export default function Signup() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <>
      <NavBar brand="Omnifood" />
      <div className="container">
        <div className="card mb-3">
          <div className="card-header text-center">Sign up</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label className="text-warning">First Name</label>
                <input
                  // onChange={handleChange("name")}
                  type="text"
                  className="form-control"
                  // value={name}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Last Name</label>
                <input
                  // onChange={handleChange("name")}
                  type="text"
                  className="form-control"
                  // value={name}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Email</label>
                <input
                  // onChange={handleChange("email")}
                  type="email"
                  className="form-control"
                  // value={email}
                />
              </div>

              <div className="form-group">
                <label className="text-warning">Password</label>
                <input
                  // onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                  // value={password}
                />
              </div>
              <button className="btn btn-warning" style={{ color: "#fff" }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      {API}
      </div>
    </>
  );
}

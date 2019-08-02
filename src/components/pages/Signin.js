import React from "react";
import NavBar from "../../components/layouts/NavBar";

export default function Signin() {
  console.log(process.env)
  return (
    <>
      <NavBar brand="Omnifood" />
      <div className="container">
        <div className="card mb-3">
          <div className="card-header text-center">Sign in</div>
          <div className="card-body">
            <form>
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

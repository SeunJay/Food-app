import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link, withRouter } from "react-router-dom";
import { signout } from "../auth";
import { createProduct } from "./apiAdmin";

function AddFood({ history }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          category: "",
          quantity: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <div className="container col-md-8 offset-md-2 card-header">
      <form
        className="mb-3"
        onSubmit={handleSubmit}
      >
        <h4>Post Photo</h4>
        <div className="form-group">
          <label htmlFor="" className="btn btn-warning">
            <input
              type="file"
              onChange={handleChange("photo")}
              name="photo"
              accept="image/*"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Name
          </label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Description
          </label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Price
          </label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            value={price}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Category
          </label>
          <select
            onChange={handleChange("category")}
            className="form-control"
          >
            <option value="5d4a0ef9342507db8d39a331">African cuisine</option>
            <option value="5d4a1006342507db8d39a332">
              Continental cuisine
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Quantity
          </label>
          <input
            onChange={handleChange("quantity")}
            className="form-control"
            type="number"
            value={quantity}
          />
        </div>
        <button className="btn btn-outline-warning">Create Food</button>
      </form>
    </div>
  );

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-warning mb-3 py-0">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            // style={isActive(history, "/")}
          >
            Dashboard
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
                  style={{ fontWeight: "800" }}
                >
                  <i className="fas fa-plus" />
                  Hello {user.firstName}
                </span>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  // style={isActive(history, "/signup")}
                  style={{ fontWeight: "800" }}
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
      {/* {showSuccess()}
      {showError()} */}
      <div className="row col-md-8 offset-md-2">
        <div className="container" />
        {newPostForm()}
      </div>
    </>
  );
}

export default withRouter(AddFood);

import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link, withRouter } from "react-router-dom";
import { signout } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";
import Capitalize from "../user/capitalize";
import Spinner from "../components/layouts/Spinner";

function AddFood({ history }) {
  const [success, setSuccess] = useState(false);
  const [error1, setError1] = useState(false);
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

  console.log(user);

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

  //load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setError1(true);
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
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
        setSuccess(true);
      }
    });
  };

  const newPostForm = () => (
    <div className="container col-md-8 offset-md-2 card-header">
      <form className="mb-3" onSubmit={handleSubmit}>
        <h5>Post Photo</h5>
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
          <select onChange={handleChange("category")} className="form-control">
            <option>Please select</option>
            {categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
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
        <button className="btn btn-outline-warning">Add Product</button>
      </form>
    </div>
  );

  const clearErrorMessage = () => {
    setTimeout(() => {
      setError1(true);
    }, 5000);
  };

  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 10000);
  };

  const showError = () => {
    clearErrorMessage();
    if (error1) {
      return (
        <div
          className="text-danger center"
          style={{ display: error ? "" : "none", textAlign: "center" }}
        >
          <h4>{error}</h4>
        </div>
      );
    }
  };

  const showSuccess = () => {
    clearSuccessMessage();
    if (success) {
      return (
        <div
          className="text-success center"
          style={{ display: createdProduct ? "" : "none", textAlign: "center" }}
        >
          <h4>{Capitalize(createdProduct)} successfully created</h4>
        </div>
      );
    }
  };


  const showLoading = () =>
    loading && (
      <div>
        <Spinner />
      </div>
    );

  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-dark mb-3 py-0 sticky-top"
        style={{ backgroundColor: "#DD4F05" }}
      >
        <div className="container">
          <Link
            to="/"
            className="navbar-brand"
            style={{ fontWeight: "800", fontSize: "2rem" }}
          >
            Paystand
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
                  // style={{ fontWeight: "800" }}
                >
                  <i className="fas fa-plus" />
                  Hello {user.name}
                </span>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  // style={isActive(history, "/signup")}
                  // style={{ fontWeight: "800" }}
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
      {/* {showLoading()} */}
      {showSuccess()}
      {showError()}
      <div className="row">
        <div className="col-md-8 offset-md-2" />

        {newPostForm()}
      </div>
    </>
  );
}

export default withRouter(AddFood);

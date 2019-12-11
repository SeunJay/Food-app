import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import { signout } from "../auth";
import Spinner from "../components/layouts/Spinner";

const ManageProducts = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  };

  const destroy = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  console.log(products);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-warning mb-3 py-0 sticky-top">
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
                  Hello {user.name}
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
      <Link
        className="btn btn-outline-warning mt-3 mx-4 mb-4"
        to="/admindashboard"
      >
        Go Back
      </Link>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-12">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Description</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              {products.map((p, i) => (
                <tbody>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{p.description}</td>
                    <td>
                      <Link
                        className="btn btn-warning"
                        to={`/admin/product/update/${p._id}`}
                      >
                        Update
                      </Link>
                    </td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => destroy(p._id)}
                        style={{ cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default ManageProducts;

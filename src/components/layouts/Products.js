import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import "./dashboard.css";
import { getFoods } from "./apiLayout";
import Cards from "./Cards";
import DashboardNav from "./DashboardNav";
import Spinner from "./Spinner";

function Products() {
  const [foodByArrival, setFoodByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadFoodsByArrival = () => {
    getFoods("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFoodByArrival(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadFoodsByArrival();
  }, []);

  const {
    user: { _id, name, businessEmail, role }
  } = isAuthenticated();

  const token = isAuthenticated().token;

  console.log(error);
  return (
    <>
      <DashboardNav cart={true} />
      <Link
        className="btn btn-outline-warning mt-3 mx-4 mb-4"
        to="/userdashboard"
      >
        Go Back
      </Link>
      <div className="container-fluid">
        {/* <h4 className="mb-4" style={{ textAlign: "center" }}>
          Products
        </h4> */}
        <div className="row">
          {/* <h4 className="mb-4 text-center" style={{ textAlign: "center" }}>
            Products
          </h4> */}
          {loading ? (
            <Spinner />
          ) : (
            foodByArrival.map((food, i) => (
              <div className="col-4 mb-4" key={i}>
                <Cards food={food} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Products;

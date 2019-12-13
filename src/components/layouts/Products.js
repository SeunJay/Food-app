import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";
import "./dashboard.css";
import "./products.css";
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


  const userLinks = () => {
    return (      
  <div className="row">
    <nav className="col-8 d-none d-md-block bg-light sidebar sidenav-top">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/userdashboard">
              <span data-feather="home"></span>
              Dashboard 
						</Link>
					</li>
					<li className="nav-item active">
						<Link className="nav-link" to="/cart">
							<span data-feather="file"></span>
							Orders
						</Link>
					</li>
					{/*<li className="nav-item">
						<Link className="nav-link" to={`/profile/${_id}`}>
							<span data-feather="shopping-cart"></span>
							Update Profile
						</Link>
            </li>*/}
					<li className="nav-item">
						<Link className="nav-link active" to="#">
							<span data-feather="users"></span>
							View Products <span className="sr-only">(current)</span>
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/dashboard/orderhistory">
							<span data-feather="bar-chart-2"></span>
							Order History
						</Link>
					</li>
				</ul>
			</div>
		</nav>
  </div>
    );
  };



  return (
    <>
      <DashboardNav cart={true} />
      {/*<Link
        className="btn btn-outline-warning mt-3 mx-4 mb-4"
        to="/userdashboard"
      >
        Go Back
  </Link>*/}
  <div className="d-flex flex-row bg-c">
      <div className="col-3">{userLinks()}</div>
      <div className="container-fluid">
        {/* <h4 className="mb-4" style={{ textAlign: "center" }}>
          Products
        </h4> */}
        <div className="row mt-4">
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
      </div>
    </>
  );
}

export default Products;

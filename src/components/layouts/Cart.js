import React, { useState, useEffect, Fragment } from "react";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
//import NavBar from "./NavBar";
import Cards from "./Cards";
import DashboardNav from "./DashboardNav";
import Checkout from "./Checkout";
import "./cart.css";


export default function Cart() {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showFood = items => {
    return (
      <div>
        <h6 className="text-center">
          You have made {`${items.length}`} order(s)
        </h6>
        {items.map((food, i) => (
          <Cards
            key={i}
            food={food}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveFoodButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };



  const noFoodMessage = () => (
    <h6 className="text-warning ml-3">
      You have not made any orders presently
    </h6>
  );

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
						<Link className="nav-link active" to="#">
							<span data-feather="file"></span>
							Orders <span className="sr-only">(current)</span>
						</Link>
					</li>
					{/*<li className="nav-item">
						<Link className="nav-link" to={`/profile/${_id}`}>
							<span data-feather="shopping-cart"></span>
							Update Profile
						</Link>
            </li>*/}
					<li className="nav-item">
						<Link className="nav-link" to="/dashboard/products">
							<span data-feather="users"></span>
							View Products
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
    <Fragment>
      <DashboardNav />
      <div className="d-flex flex-row bg-c">
      <div className="col-3">{userLinks()}</div>
      {/*<Link className="btn btn-outline-warning mt-3 mx-4 mb-4" to="/userdashboard">
        Go Back
            </Link>*/}
      {/* <h1 className="text-center">Order Page</h1> */}
      <div className="row mt-4">
        <div className="col-4">
          {items.length > 0 ? showFood(items) : noFoodMessage()}
        </div>
        <div className="col-6">
          <h6 className="mb-4">Your Order summary</h6>
          
          <div class="container">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              {items.map((item, i) => (
                <tbody>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <Checkout foods={items} />
        </div>
      </div>
      </div>
    </Fragment>
  );
}

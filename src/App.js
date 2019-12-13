import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
//import NavBar from "./components/layouts/NavBar";
import Shop from "../src/components/pages/Shop"
import Signup from "./components/pages/Signup";
import Signin from "./components/pages/Signin";
import UserDashboard from "./components/layouts/UserDashboard";
import Profile from "./components/layouts/Profile"
import AdminDashboard from "./components/layouts/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddFood from "./admin/AddFood";
import Food from "../src/components/layouts/Food";
import Orders from "./admin/Orders";
import Cart from "../src/components/layouts/Cart";
import PrivateRoute from "./auth/PrivateRoute";
import OrderHistory from "./components/layouts/OrderHistory"
import Products from "./components/layouts/Products"
import AdminRoute from "./auth/AdminRoute";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import $ from "jquery";
// import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import FeatherIcon from "feather-icons-react";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar brand="Omnifood" /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/food/:foodId" component={Food} />
          <PrivateRoute exact path="/userdashboard" component={UserDashboard} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute exact path="/profile/:userId" component={Profile} />
          <PrivateRoute
            path="/dashboard/orderhistory"
            component={OrderHistory}
          />
          <PrivateRoute
            path="/dashboard/products"
            component={Products}
          />
          <AdminRoute exact path="/admindashboard" component={AdminDashboard} />
          <AdminRoute path="/admin/orders" component={Orders} />
          <AdminRoute exact path="/create/category" component={AddCategory} />
          <AdminRoute exact path="/create/product" component={AddFood} />
          <PrivateRoute
            path="/admin/products"
            exact
            component={ManageProducts}
          />
          <AdminRoute path="/admin/products" exact component={ManageProducts} />
          <AdminRoute
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

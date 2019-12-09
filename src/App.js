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
import AdminRoute from "./auth/AdminRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <AdminRoute exact path="/admindashboard" component={AdminDashboard} />
          <AdminRoute path="/admin/orders" component={Orders} />
          <AdminRoute exact path="/create/category" component={AddCategory} />
          <AdminRoute exact path="/create/product" component={AddFood} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

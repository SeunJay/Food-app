import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
//import NavBar from "./components/layouts/NavBar";
import Signup from "./components/pages/Signup";
import Signin from "./components/pages/Signin";
import UserDashboard from "./components/layouts/UserDashboard";
import AdminDashboard from "./components/layouts/UserDashboard";
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
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <PrivateRoute exact path="/userdashboard" component={UserDashboard} />
          <AdminRoute
            exact
            path="/admindashboard"
            component={AdminDashboard}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

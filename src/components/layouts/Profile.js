import React from "react";
import NavBar from "./NavBar";
import { isAuthenticated } from "../../auth/index";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <NavBar brand="Omnifood" />
    </div>
  );
}

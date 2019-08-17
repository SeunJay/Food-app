import React from "react";
//import NavBar from "../layouts/NavBar";
//import { Link } from "react-router-dom";
import NavBar from "../../components/layouts/NavBar";
import "./Home.css";
import Search from "../layouts/Search";

export default function Home() {
  return (
    <>
      <NavBar brand="Omnifood" />
      <section id="section-background">
        <div className="hero-text-box">
          <h1 className="caption">
            Goodbye junk food.
            <br />
            Hello super healthy meals.
          </h1>
        </div>
      </section>
      <section
        className="container-fluid"
        style={{ width: "100%", height: "100%", border: "1px solid #000" }}
      >
        <div className="row">
          <h2 style={{ margin: "0 auto" }}>Searched foods go here</h2>
          <div className="container-fluid">
            <Search />
          </div>
        </div>
        <div className="container-fluid mb-3">kjddjkdjdjkdkj</div>
      </section>
    </>
  );
}

import React from "react";
//import NavBar from "../layouts/NavBar";
import { Link } from "react-router-dom";
import NavBar from "../../components/layouts/NavBar";
import "./Home.css";

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
          {/* <Link className="btn btn-full js--scroll-to-plans" href="/">
            I'm hungry
          </Link> */}
          <input
            type="search"
            className="search-bar"
            placeholder="search for food"
          />
          <button className="search-button" type="button">
            search
          </button>
        </div>
      </section>
    </>
  );
}

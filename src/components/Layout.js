import React from "react";
import NavBar from "./layouts/NavBar"

export default function Layout({
  title = "Title",
  description = "Description",
  className,
  children
}) {
  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>{title}</h2>
        <p className="lead" style={{ textAlign: "center" }}>
          {description}
        </p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}

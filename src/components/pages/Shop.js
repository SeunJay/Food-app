import React from 'react';
import NavBar from "../layouts/NavBar"

export default function Shop() {
  return (
    <>
      <NavBar brand="Omnifood" />
      <div className="row">
        <div className="col-4">left sidebar</div>
        <div className="col-8">right sidebar</div>
      </div>
    </>
  );
}

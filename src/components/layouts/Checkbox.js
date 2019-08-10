import React, { useState, useEffect } from "react";

export default function Checkbox({ categories }) {
  return (
    <>
      {categories.map((category, i) => (
        <li key={i} className="list-unstyled">
          <input type="checkbox" className="form-check-input" />
          <label htmlFor="" className="form-check-label">
            {category.name}
          </label>
        </li>
      ))}
    </>
  );
}

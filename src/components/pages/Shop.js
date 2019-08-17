import React, { useState, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import { getCategories } from "../layouts/apiLayout";
import Checkbox from "../layouts/Checkbox";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilters = (filters, filterBy) => {
    console.log(filters, filterBy);
  };

  return (
    <>
      <NavBar brand="Omnifood" />
      <div className="container-fluid offset-md-1">
        <div className="row">
          <div className="col-4">
            <h4>Filter by Categories</h4>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </div>
          <div className="col-8">right sidebar</div>
        </div>
      </div>
    </>
  );
}

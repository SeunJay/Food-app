import React, { useState, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import { getCategories } from "../layouts/apiLayout";
import Checkbox from "../layouts/Checkbox";
import { prices } from "../layouts/fixedPrices";
import RadioBox from "../layouts/RadioBox";

export default function Shop() {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
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
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    setMyFilters(newFilters);
  };

  const handlePrice = id => {
    const data = prices;
    let array = []

    for(let key in data){
      if(data[key]._id === parseInt(id)){
        array = data[key].array
      }
    }
    return array
  };

  return (
    <>
      <NavBar brand="Omnifood" />
      <div className="">
        <div className="row">
          <div className="col-4">
            <h4>Filter by Categories</h4>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={filters => handleFilters(filters, "category")}
              />
            </ul>
            <h4>Filter by Price range</h4>
            <div>
              <RadioBox
                prices={prices}
                handleFilters={filters => handleFilters(filters, "price")}
              />
            </div>
          </div>
          <div className="col-8">{JSON.stringify(myFilters)}</div>
        </div>
      </div>
    </>
  );
}

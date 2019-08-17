import React, { useState, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import { getCategories, getFilteredFoods } from "../layouts/apiLayout";
import Checkbox from "../layouts/Checkbox";
import { prices } from "../layouts/fixedPrices";
import RadioBox from "../layouts/RadioBox";
import Cards from "../layouts/Cards";

export default function Shop() {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredData = newFilters => {
    //console.log(newFilters);
    getFilteredFoods(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
      }
    });
  };

  useEffect(() => {
    loadFilteredData(skip, limit, myFilters.filters);
    init();
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    loadFilteredData(myFilters.filters);

    setMyFilters(newFilters);
  };

  const handlePrice = id => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(id)) {
        array = data[key].array;
      }
    }
    return array;
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
          <div className="col-8">
            <h2 className="mb-4">Foods</h2>
            <div className="row">
              {filteredResults.map((food, i) => (
                <Cards key={i} food={food} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

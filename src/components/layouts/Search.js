import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiLayout";
import Cards from "../layouts/Cards";

export default function Search() {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  console.log(categories);

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log("search loading...")
    // console.log(category, search)
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = event => {
    event.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchFoods = (results = []) => {
    return (
      <div className="row" style={{marginTop: "40px"}}>
        {results.map((food, i) => (
          <Cards key={i} food={food} />
        ))}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text" style={{ background: "#f0f0f0" }}>
        <div className="input-group warning input-group-lg">
          <div className="input-group-prepend">
            <select
              className="btn mr-2"
              onChange={handleChange("category")}
              style={{ outline: "none" }}
            >
              <option value="All">Pick Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button
            className="input-group-text"
            style={{ background: "#ffc107", color: "#fff", outline: "none" }}
          >
            Search
          </button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchFoods(results)}</div>
    </div>
  );
}

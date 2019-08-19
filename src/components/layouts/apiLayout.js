import { API } from "../../config";
import queryString from "querystring";

export const getFoods = sortBy => {
  return fetch(`${API}/foods?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const getFilteredFoods = (skip, limit, filters = {}) => {
  const data = {
    skip,
    limit,
    filters
  };
  return fetch(`${API}/foods/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const list = params => {
  const query = queryString.stringify(params);
  console.log(query);
  return fetch(`${API}/foods/search?${query}`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const readFood = foodId => {
  return fetch(`${API}/food/${foodId}`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};



export const listRelated = (foodId) => {
  return fetch(`${API}/foods/related/${foodId}`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};









import { API } from "../../config";

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

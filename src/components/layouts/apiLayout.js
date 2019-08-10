import { API } from "../../config";

export const getFoods = (sortBy) => {
  return fetch(`${API}/foods?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

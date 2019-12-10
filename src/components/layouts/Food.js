import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { readFood, listRelated } from "../layouts/apiLayout";
import Cards from "./Cards";

export default function Food({ match }) {
  const [food, setFood] = useState({});
  const [error, setError] = useState(false);
  const [relatedFood, setRelatedFood] = useState([])

  const loadSingleFood = foodId => {
    readFood(foodId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFood(data);
        //fetch related foods
        listRelated(data._id).then(data => {
          if(data.error){
            setError(data.error)
          } else {
            setRelatedFood(data)
          }
        })
      }
    });
  };

  console.log(food)
  console.log(relatedFood)

  useEffect(() => {
    const foodId = match.params.foodId;
    loadSingleFood(foodId);
  }, [match]);

  console.log(food);

  return (
    <>
      <NavBar brand="Paystand" />
      <h1 className="mb-4 text-center">{food.name} Page</h1>
      <div className="row">
        <div className="col-8 mb-4">
          {food && food.description && (
            <Cards food={food} showViewFoodButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Food</h4>
          {relatedFood.map((f, i)=>(
            <div className="mb-3">
              <Cards key={i} food={f}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

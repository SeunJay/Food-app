import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";
import {readFood} from "../layouts/apiLayout"

export default function Food({match}) {
  const [food, setFood] = useState({});
  const [error, setError] = useState(false);

  const loadSingleFood = foodId =>{
    readFood(foodId).then(data => {
      if(data.error){
        setError(data.error)
      } else {
        setFood(data)
      }
    })
  }

  useEffect(()=>{
    const foodId = match.params.foodId;
    loadSingleFood(foodId)
  }, [])

  console.log(food)

  return (
    <div>
      <NavBar brand="Omnifood"/>
      <h1 className="mb-4 text-center">Food Page</h1>
    </div>
  );
}

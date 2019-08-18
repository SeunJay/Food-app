import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";
import {readFood} from "../layouts/apiLayout"
import Cards from "./Cards"

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
    <>
      <NavBar brand="Omnifood" />
      <h1 className="mb-4 text-center">Food Page</h1>
      <div className="row">
        <div className="col-5 mb-4" style={{margin: "0 auto"}}>
          {food && food.description && <Cards food={food} showViewFoodButton={false}/>}
        </div>
      </div>
    </>
  );
}

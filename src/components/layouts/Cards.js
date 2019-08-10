import React from 'react'
import {Link} from "react-router-dom"

export default function Cards({food}) {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{food.name}</div>
        <div className="card-body">
          <p>{food.description}</p>
          <p>${food.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Food
            </button>
            <button className="btn btn-outline-warning mt-2 mb-2">
              Add to card
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

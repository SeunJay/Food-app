import React from "react";
import { API } from "../../config";

export default function ShowImage({ item, url }) {
  return (
    <div className="food-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );
}

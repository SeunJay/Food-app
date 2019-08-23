// import stringyfy from "fast-safe-stringify";
// import CircularJSON from "circular-json";
export const addFood = (food, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...food,
      count: 1
    });
    cart = Array.from(new Set(cart.map(f => f._id))).map(id => {
      return cart.find(f => f._id === id);
    });
    // console.log(cart, "cart");
    // console.log(food, "food");

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

// function replacer(key, value) {
//   // Filtering out properties
//   if (typeof value === "string") {
//     return undefined;
//   }
//   return value;
// }

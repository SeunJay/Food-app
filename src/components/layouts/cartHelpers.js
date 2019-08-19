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
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

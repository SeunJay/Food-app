const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    food: { type: ObjectId, ref: "Food" },
    name: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    foods: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    user: { type: mongoose.Schema.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

// OrderSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "user",
//     select: "firstName"
//   });
//   next();
// });

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };

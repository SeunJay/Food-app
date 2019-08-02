const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      maxlength: 32
    },
    description: {
      type: String,
      require: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      require: true,
      trim: true,
      maxlength: 32
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true
    },
    quantity: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);

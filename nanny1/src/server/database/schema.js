const mongoose = require("mongoose");
//setup schema -> set up model > use modal to query and update entity in database

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        id: { type: String, required: true },
        num: { type: Number, required: true },
      },
    ],
    id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productScheme = new mongoose.Schema(
  {
    id: { type: String, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    imgSrc: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = { userSchema, productScheme };

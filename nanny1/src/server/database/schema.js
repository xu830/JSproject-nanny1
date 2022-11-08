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
    cart: [],
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;

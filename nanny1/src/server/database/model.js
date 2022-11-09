const mongoose = require("mongoose");
const { userSchema, productScheme } = require("./schema");

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productScheme);
module.exports = { User, Product };

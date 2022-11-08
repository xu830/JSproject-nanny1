const mongoose = require("mongoose");
const connectionStr =
  "mongodb+srv://chuwa-ynx:chuwayn0828@cluster0.gffwewi.mongodb.net/project2?retryWrites=true&w=majority";
const connectToMongoose = () => {
  console.log("try to connect");
  mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.on("open", () => {
    console.log("connect to mongodb!");
  });
};
module.exports = connectToMongoose;

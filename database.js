const mongoose = require("mongoose");
const link = "mongodb://127.0.0.1:27017/blog";
mongoose.connect(link);
const database = mongoose.connection;

database.on("connected", () => {
  console.log("connected to mongodb");
});

database.on("error", (err) => {
  console.error("error");
});

database.on("disconnected", () => {
  console.log("disconnected");
});

module.exports = database;

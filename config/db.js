const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;

const db = mongoose.connect(DB_HOST);

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from Database");
});

// process.on("SIGINT", async () => {
//   mongoose.connection.close(() => {
//     console.log("Disconnected from DB");
//     process.exit(1);
//   });
// });

module.exports = db;

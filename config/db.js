const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;

const db = mongoose
  .connect(DB_HOST)
  .then(console.log("Database connection successful"));

// const db = mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on("connected", () => {
//   console.log("Connected to DB");
// });

// mongoose.connection.on("error", (err) => {
//   console.log(`Mongoose connection error: ${err}`);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("Disconnected from DB");
// });

// process.on("SIGINT", async () => {
//   mongoose.connection.close(() => {
//     console.log("Disconnected from DB");
//     process.exit(1);
//   });
// });

module.exports = db;

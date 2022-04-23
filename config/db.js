const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

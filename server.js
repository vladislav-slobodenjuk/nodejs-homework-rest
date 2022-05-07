require("dotenv").config();

const { mkdir } = require("fs/promises");
const db = require("./config/db");
const app = require("./app");

db.then(() => {
  app.listen(process.env.PORT || 3000, async () => {
    await mkdir(process.env.UPLOAD_FOLDER, { recursive: true });
    await mkdir(process.env.STATIC_FOLDER, { recursive: true });
    console.log("Server running. Use our API on port: 3000");
  });
}).catch((err) => {
  console.log(err.message);
  process.exit(1);
});

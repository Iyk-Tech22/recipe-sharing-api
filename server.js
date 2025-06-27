/* eslint-disable no-console */
require("dotenv").config();
const app = require("./app");
const connectDB = require("./db");

const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("App running on port 3000...");
    });
  })
  .catch(console.log);

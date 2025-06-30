/* eslint-disable no-console */
require("dotenv").config();
const app = require("./app");
const connectDB = require("./db");
const FileStorage = require("./utils/fileStorage");

const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    FileStorage.initialize();
    app.listen(port, () => {
      console.log("App running on port 3000...");
    });
  })
  .catch(console.log);

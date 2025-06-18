/* eslint-disable no-console */
require("dotenv").config();
const app = require("./app");
const runDB = require("./db");

const port = process.env.PORT || 3000;
runDB().catch(console.log);
app.listen(port, () => {
  console.log("App running on port 3000...");
});

/* eslint-disable no-console */
const mongoose = require("mongoose");

const dbUri = process.env.DATABASE_URI;
const dbName = process.env.DATABASE;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbUser = process.env.DATABASE_USER;

let uri = dbUri.replace("<DATABASE>", dbName);
uri = uri.replace("<DATABASE_PASSWORD>", dbPassword);
uri = uri.replace("<DATABASE_USER>", dbUser);

module.exports = async function () {
  try {
    await mongoose.connect(uri);
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

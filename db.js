/* eslint-disable no-console, import/no-extraneous-dependencies */
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DATABASE_URI.replace(
  "<DB_PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function runDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

module.exports = runDB;

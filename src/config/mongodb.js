import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_URL;

let client;
const connectToMongodb = async () => {
  try {
    MongoClient.connect(url).then((clientInstance) => {
      client = clientInstance;
      console.log("connect to db");
      // createCounter(client.db());
      // createindexes(client.db());
    });
  } catch (error) {
    console.log("error while connecting to the mongodb", error);
  }
};

export const getdb = () => {
  return client.db();
};

export default connectToMongodb;

// const createCounter = async (db) => {
//   const existingCounter = await db
//     .collection("counters")
//     .findOne({ _id: "cartItemId" });

//   if (!existingCounter) {
//     await db.collection("counters").insertOne({ _id: "cartItemid", value: 0 });
//   }
// };

const createindexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ name: 1, category: -1 });
    await db.collection("products").createIndex({ desc: "text" });
    console.log("Indexes are created");
  } catch (error) {
    console.log(error);
  }
};

export const getClient = () => {
  return client;
};

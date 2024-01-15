import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

const connectToMongodb = async () => {
  try {
    await MongoClient.connect(url);
    console.log("connected to the mongodb");
  } catch (error) {
    console.log("error while connecting to the mongodb", error);
  }
};

export default connectToMongodb;

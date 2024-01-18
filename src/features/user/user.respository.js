import { getdb } from "../../config/mongodb.js";

export class UserRepository {
  constructor() {
    this.collection = "users";
  }
  async signUp(newUser) {
    try {
      //1. db connection
      const db = getdb();

      // 2. creating the collection
      const collection = db.collection(this.collection);

      // 3. inserting the document
      const user = await collection.insertOne(newUser);

      return user;
    } catch (error) {
      console.log("repo", error);
      return error;
    }
  }

  async signIn(email, password) {
    try {
      const db = getdb();
      const collection = db.collection(this.collection);
      const user = collection.findOne({ email, password });
      return user;
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email, password) {
    try {
      const db = getdb();
      const collection = db.collection(this.collection);
      const user = collection.findOne({ email });
      return user;
    } catch (error) {
      return error;
    }
  }
}

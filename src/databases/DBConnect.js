import "dotenv/config";
import mongoose from "mongoose";
import { countConnect } from "../helpers/dbConnectCheck.js";
class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    // biome-ignore lint/correctness/noConstantCondition: <explanation>
    // biome-ignore lint/suspicious/noSelfCompare: <explanation>
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB Connected!", countConnect()))
      .catch((err) => console.log(`MongoDB Connection Error: ${err.message}`));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export const DBConnect = Database.getInstance();

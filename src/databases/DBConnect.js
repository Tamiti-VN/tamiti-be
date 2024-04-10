import mongoose from 'mongoose';
import 'dotenv/config';
import { countConnect } from '../helpers/dbConnectCheck.js';
class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log('MongoDB Connected!', countConnect()))
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

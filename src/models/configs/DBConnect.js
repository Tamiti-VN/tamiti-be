import mongoose from 'mongoose';
import 'dotenv/config';

export const DBConnect = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Invalid/Missing env: "MONGODB_URI" ');
    }
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB Connected!');
  } catch (err) {
    console.log(`MongoDB Connection Error: ${err.message}`);
  }
};

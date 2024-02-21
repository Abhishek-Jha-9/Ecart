import mongoose from "mongoose";

export const connectDB = async (req, res, next) => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connecting to MongoDb: ${connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  }
};

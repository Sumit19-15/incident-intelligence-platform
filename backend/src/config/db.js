import mongoose from "mongoose";

const connectDatabase = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is connected.");
  } catch (err) {
    console.log("Error in database connection :", err);
    process.exit(1); 
  }
};

export default connectDatabase;

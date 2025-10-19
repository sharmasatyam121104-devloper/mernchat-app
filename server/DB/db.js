import mongoose from "mongoose";
import chalk from "chalk";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`, {
    });
    console.log(chalk.yellow(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // stop process on error
  }
};

export default connectDB;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // allowed values
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

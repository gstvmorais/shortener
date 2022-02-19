import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phones: [String],
    role: { type: String, enum: ["Administrator", "User"], default: "User" },
  },
  {
    timestamp: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;

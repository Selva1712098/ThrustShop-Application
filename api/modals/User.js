import mongoose from "mongoose";
import Schema from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

   
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);

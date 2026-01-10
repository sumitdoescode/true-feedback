// import { string } from "better-auth";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      username: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      emailVerified: {
         type: Boolean,
      },
      image: {
         type: String,
      },
      isAcceptingMessages: {
         type: Boolean,
         default: true,
      },
   },
   { timestamps: true }
);

const User = mongoose.models.User || model("User", userSchema);

export default User;

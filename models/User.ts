import mongoose, { models, model, Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        emailVerified: {
            type: Boolean,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
        },
        isAcceptingMessages: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

const User = models.User || model("User", userSchema);

export default User;

import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
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
        isAcceptingMessages: {
            type: Boolean,
            default: true,
        },
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.models.User || model("User", userSchema);

export default User;

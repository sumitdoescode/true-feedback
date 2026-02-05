import { models, model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
        },
        emailVerified: {
            type: Boolean,
            required: true,
        },
        username: {
            type: String,
            required: true,
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

// index for email
userSchema.index({ email: 1 });

// index of username field
userSchema.index({ username: 1 });

const User = models.User || model("User", userSchema);

export default User;

import mongoose, { Schema, model, models } from "mongoose";

export interface IMessage extends mongoose.Document {
    content: string;
    receiver: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

const Message = models.Message || model("Message", messageSchema);

export default Message;

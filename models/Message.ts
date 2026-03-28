import { Schema, model, models, type Document, type ObjectId, InferSchemaType } from "mongoose";

export interface IMessage extends Document {
    content: string;
    receiver: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        receiver: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Message = models.Message || model("Message", messageSchema);

export default Message;

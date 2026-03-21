import { Schema, model, models, type Document, type ObjectId, InferSchemaType } from "mongoose";

export interface IMessage extends Document {
    content: string;
    receiver: ObjectId;
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
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

const Message = models.Message || model("Message", messageSchema);

export default Message;

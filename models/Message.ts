import { Schema, model, models, InferSchemaType } from "mongoose";

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true },
);

export type IMessage = InferSchemaType<typeof messageSchema>;

const Message = models.Message || model<IMessage>("Message", messageSchema);

export default Message;

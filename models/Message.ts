import mongoose, { Schema, model } from "mongoose";

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

   { timestamps: true }
);

const Message = mongoose.models.Message || model("Message", messageSchema);

export default Message;

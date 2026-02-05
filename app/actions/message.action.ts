"use server";
import { MessageSchema, MessageType } from "@/schemas/message.schema";
import { connectDB } from "@/lib/db";
import { z } from "zod";
import Message from "@/models/Message";
import User from "@/models/User";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function sendMessage(formData: MessageType) {
    try {
        await connectDB();

        // validate the data against the schema
        const { success, data, error } = MessageSchema.safeParse(formData);
        if (!success) {
            return { success: false, error: z.flattenError(error).fieldErrors };
        }

        // to whom we need to send the message
        const { content, to } = data;
        const user = await User.findOne({ username: to }).select("isAcceptingMessages");
        if (!user) {
            return { success: false, message: "User not found" };
        }
        if (!user.isAcceptingMessages) {
            return { success: false, message: "User is not accepting messages" };
        }

        const message = await Message.create({ content, receiver: user._id });

        await message.save();

        return { success: true, message: "Message sent successfully" };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
}

export async function deleteMessage({ messageId }: { messageId: string }) {
    try {
        await connectDB();
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user) {
            return { success: false, message: "Unauthorized" };
        }
        const user = await User.exists({ email: session?.user?.email });
        if (!user) {
            return { success: false, message: "Unauthorized" };
        }

        // find the message
        const message = await Message.findById(messageId);
        if (!message) {
            return { success: false, message: "Message not found" };
        }

        //   check if the message is sent to the user
        if (message.receiver.toString() !== user._id.toString()) {
            return { success: false, message: "Unauthorized" };
        }

        await message.deleteOne();

        return { success: true, message: "Message deleted successfully" };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
}

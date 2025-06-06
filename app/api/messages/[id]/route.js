import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";
import Message from "@/models/Message";
import connectDB from "@/lib/db";
import { isValidObjectId } from "mongoose";

// DELETE => api/messages/[id]
// route to delete a message by it's receiver
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const { id } = params;

        if (!id || typeof id !== "string") {
            return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 });
        }
        // Validate the ID format
        if (!isValidObjectId(id)) {
            return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
        }

        const message = await Message.findById(id);
        if (!message) {
            return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
        }

        // Check if the message belongs to the user
        if (message.receiver.toString() !== user._id.toString()) {
            return NextResponse.json({ success: false, message: "You are not allowed to delete this message" }, { status: 403 });
        }

        await Message.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Message deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

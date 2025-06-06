import User from "@/models/User";
import Message from "@/models/Message";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

// GET => api/users/[username]
// Purpose: Check if a user with that username is accepting messages.
export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const { username } = params;
        const user = await User.findOne({ username: username });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, isAcceptingMessages: user.isAcceptingMessages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
};

// POST => api/users/[username]
// This route handles sending a message to a user by their username
export async function POST(request) {
    try {
        await connectDB();

        const { content, username } = await request.json();

        if (!content || !username.trim()) {
            return NextResponse.json({ success: false, message: "Content and username are required" }, { status: 400 });
        }

        const recipient = await User.findOne({ username: username.trim() });
        if (!recipient) {
            return NextResponse.json({ error: "Recipient not found with that username" }, { status: 404 });
        }

        if (!recipient.isAcceptingMessages) {
            return NextResponse.json({ success: false, message: "User is not accepting messages" }, { status: 403 });
        }

        const message = await Message.create({
            content: content.trim(),
            receiver: recipient._id,
        });

        return NextResponse.json({ success: true, message: "Message sent successfully", data: message }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

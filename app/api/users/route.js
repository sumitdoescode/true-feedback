import Message from "@/models/Message";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This route handles fetching the user profile and their messages, dashboard
export const GET = async (request) => {
    try {
        await connectDB();
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findOne({ clerkId: userId }).populate("messages");
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
};

// this routes toggle the user's ability to accept messages
export const PATCH = async (request) => {
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

        if (user.isAcceptingMessages) {
            await User.findByIdAndUpdate(user._id, { isAcceptingMessages: false }, { new: true });
            return NextResponse.json({ success: false, message: "You are no longer accepting message" }, { status: 403 });
        } else {
            await User.findByIdAndUpdate(user._id, { isAcceptingMessages: true }, { new: true });
            return NextResponse.json({ success: true, message: "You are now accepting messages" }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
};

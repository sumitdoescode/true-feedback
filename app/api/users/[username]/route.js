import User from "@/models/User";
import Message from "@/models/Message";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

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

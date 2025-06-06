import User from "@/models/User";
import Message from "@/models/Message";
import { auth } from "clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

// this route validates the user's username to see if it exists in the database
export const GET = async (request) => {
    try {
        await connectDB();
        const { username } = await auth();
        if (!username) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const userExists = await User.exists({ username: username });

        return NextResponse.json({ success: true, isValidUsername: !userExists }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
};

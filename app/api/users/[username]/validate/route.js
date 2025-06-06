import User from "@/models/User";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

// GET => api/users/[username]/validate
// This route checks if a username is valid or not, client will be not authenticated
export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const { username } = params;
        if (!username) {
            return NextResponse.json({ success: false, message: "Username is required" }, { status: 401 });
        }
        const userExists = await User.exists({ username: username });

        return NextResponse.json({ success: true, isValidUsername: !userExists }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
};

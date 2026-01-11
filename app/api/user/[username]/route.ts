import User from "@/models/User";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";

// GET => /api/user/[username]
// this route is used to fetch user profile by username
export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    try {
        await connectDB();

        const user = await User.findOne({ username }).select("name username image isAcceptingMessages");

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: { user } }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

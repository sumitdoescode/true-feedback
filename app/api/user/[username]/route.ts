import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { db } from "@/lib/auth";

// GET => /api/user/[username]
// this route is used to fetch user profile by username (public route)
export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
    try {
        await connectDB();
        const { username } = await params;

        if (!username) {
            return NextResponse.json({ success: false, message: "Username is required" }, { status: 400 });
        }

        const user = await db.collection("user").findOne(
            { username: username.trim().toLowerCase() },
            {
                projection: {
                    id: 1,
                    name: 1,
                    image: 1,
                    username: 1,
                    isAcceptingMessages: 1,
                },
            },
        );

        if (!user) {
            return NextResponse.json({ success: false, message: `User not found with username ${username}` }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}

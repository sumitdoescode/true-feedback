import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import User from "@/models/User";
import Message from "@/models/Message";

// GET => /api/user
// fetch own user profile
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const loggedInuser = await User.findOne({ email: session?.user?.email }).select("name username image isAcceptingMessages").lean();
        if (!loggedInuser) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const messages = await Message.find({ receiver: loggedInuser._id }).sort({ createdAt: -1 }).lean();
        const user = { ...loggedInuser, messages };
        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

// PATCH => /api/user
// this route is used to toggle isAcceptignMessage value

export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: session?.user?.email }).select("isAcceptingMessages");
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        user.isAcceptingMessages = !user.isAcceptingMessages;
        await user.save();

        return NextResponse.json({ success: true, data: { isAcceptingMessages: user.isAcceptingMessages } }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

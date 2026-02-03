import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

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

        return NextResponse.json({ success: true, data: { isAcceptingMessages: user.isAcceptingMessages } }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

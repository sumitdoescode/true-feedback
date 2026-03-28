import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";
import Message from "@/models/Message";
import { UpdateProfileSchema } from "@/schemas/profile.schema";
import { flattenError } from "zod";

// PATCH => /api/user/toggle-accept-messages
// this route is used to toggle isAcceptingMessages value
export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        const user = session?.user;
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await auth.api.updateUser({
            body: {
                isAcceptingMessages: !user.isAcceptingMessages,
            },
            headers: await headers(),
        });

        return NextResponse.json({ success: true, data: { isAcceptingMessages: !user.isAcceptingMessages } }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}

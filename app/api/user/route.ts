import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";
import Message from "@/models/Message";
import { UpdateProfileSchema } from "@/schemas/profile.schema";
import { flattenError } from "zod";

// GET => /api/user
// fetch own user profile
export async function GET() {
    try {
        await connectDB();
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        const user = session?.user;

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        // fetching user messages
        const messages = await Message.find({ receiver: user.id }).sort({ createdAt: -1 }).lean();
        const userResponse = {
            name: user.name,
            image: user.image,
            username: user.username,
            isAcceptingMessages: user.isAcceptingMessages,
            messages,
        };
        return NextResponse.json({ success: true, user: userResponse }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}

// PATCH => /api/user
// this route is used to update username
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

        const data = await request.json();
        const result = UpdateProfileSchema.safeParse(data);
        if (!result.success) {
            return NextResponse.json({ success: false, error: flattenError(result.error).fieldErrors }, { status: 400 });
        }

        const { username } = result.data;

        if (user.username === username) {
            return NextResponse.json({ success: true, message: "Username updated successfully" }, { status: 200 });
        }

        const existingUser = await db.collection("user").findOne(
            { username },
            {
                projection: {
                    id: 1,
                },
            },
        );

        if (existingUser) {
            return NextResponse.json({ success: false, error: { username: ["Username already exists"] } }, { status: 409 });
        }

        await auth.api.updateUser({
            body: {
                username,
            },
            headers: await headers(),
        });

        return NextResponse.json({ success: true, message: "Username updated successfully" }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}

// DELETE => /api/user
// this route is used to delete user
// export async function DELETE() {
//     try {
//         await connectDB();
//         const session = await auth.api.getSession({
//             headers: await headers(),
//         });
//         const user = session?.user;
//         if (!user) {
//             return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//         }

//         await auth.api.deleteUser({
//             body: {
//                 callbackURL: "/",
//             },
//             headers: await headers(),
//         });

//         return NextResponse.json({ success: true, message: "Profile deleted successfully" }, { status: 200 });
//     } catch (error: unknown) {
//         return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
//     }
// }

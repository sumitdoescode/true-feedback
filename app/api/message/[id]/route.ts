import { GoogleGenAI } from "@google/genai";
import { NextResponse, type NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Message from "@/models/Message";
import { isValidObjectId } from "mongoose";

// DELETE => /api/message/[id]
// this route is used to delete a message
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json({ success: false, message: "Invalid message ID" }, { status: 400 });
        }

        const session = await auth.api.getSession({
            headers: await headers(),
        });

        const user = session?.user;
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const deleted = await Message.findByIdAndDelete({ _id: id, receiver: user.id });
        if (!deleted) {
            return NextResponse.json({ success: false, message: "Message not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Message deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}

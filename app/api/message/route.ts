import { GoogleGenAI } from "@google/genai";
import { NextResponse, type NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { SendMessageSchema } from "@/schemas/message.schema";
import { flattenError } from "zod";
import { db } from "@/lib/auth";
import Message from "@/models/Message";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET() {
    try {
        const response = await ai.models.generateContent({
            model: `${process.env.AI_MODEL_NAME}`,
            contents:
                "Generate a open-ended and engaging question as a single string. The question is for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Focus should be on universal themes that encourage good and positive interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?'. Make sure to ask only one question and also make sure language is easy. Ensure the questions are bit complex, foster curiosity, and contribute to a positive and non-toxic conversational environment. Make sure the question is short and concise.",
        });

        if (!response.text) {
            return NextResponse.json({ success: false, data: "No response from AI" }, { status: 500 });
        }

        return NextResponse.json({ success: true, content: response.text });
    } catch (error: unknown) {
        console.error("Error generating message:", error);
        return NextResponse.json({ success: false, data: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}

// POST => /api/message
// this route is used to send a message
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const data = await request.json();
        const result = SendMessageSchema.safeParse(data);
        if (!result.success) {
            return NextResponse.json({ success: false, error: flattenError(result.error).fieldErrors }, { status: 400 });
        }
        const { content, to } = result.data;
        const username = to.trim().toLowerCase();

        // direct db query
        const user = await db.collection("user").findOne(
            { username },
            {
                projection: {
                    id: 1,
                    isAcceptingMessages: 1,
                },
            },
        );

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (!user.isAcceptingMessages) {
            return NextResponse.json({ success: false, message: "This user is not accepting messages" }, { status: 403 });
        }

        const message = await Message.create({ content, receiver: user._id });

        await message.save();

        return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
    }
}

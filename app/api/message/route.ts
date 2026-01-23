import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET(request: NextRequest) {
    try {
        const response = await ai.models.generateContent({
            model: `${process.env.AI_MODEL_NAME}`,
            contents:
                "Generate a open-ended and engaging question as a single string. The question is for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Include personal and sensitive topics, focusing instead on universal themes that encourage toxic and interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?. Make sure to ask only one question and also make sure language is easy. Ensure the questions are bit complex, foster curiosity, and contribute to a positive and toxic conversational environment. Make sure the question is short and concise.",
        });
        if (!response.text) {
            return NextResponse.json({ success: false, data: "No response from AI" });
        }

        return NextResponse.json({ success: true, data: response.text });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ success: false, data: error.message || "Internal Server Error" });
    }
}

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import Message from "@/models/Message";
import { connectDB } from "./db";
import { username } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI!);
export const db = client.db();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    database: mongodbAdapter(db),

    emailAndPassword: {
        enabled: true,
    },
    plugins: [username()],

    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await connectDB();
                    const emailPrefix = user.email.split("@")[0].toLowerCase();
                    const normalizedPrefix = emailPrefix
                        .replace(/[^a-z._]/g, "_")
                        .replace(/[._]{2,}/g, "_")
                        .replace(/^[._]+|[._]+$/g, "");
                    const usernameBase = normalizedPrefix || "user";
                    const username = `${usernameBase}_${user.id.slice(0, 6).toLowerCase()}`;
                    await db.collection("user").updateOne({ id: user.id as any }, { $set: { username } });
                },
            },
            delete: {
                after: async (user) => {
                    try {
                        await connectDB();
                        await Message.deleteMany({ receiver: user.id }); // delete all the messages related to the user
                    } catch (error) {
                        console.error("Failed to delete profile during cleanup:", error);
                    }
                },
            },
        },
    },
    user: {
        additionalFields: {
            isAcceptingMessages: {
                type: "boolean",
                default: true,
            },
        },
        deleteUser: {
            enabled: true,
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});

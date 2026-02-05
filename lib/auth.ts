import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import User from "@/models/User";
import Message from "@/models/Message";
import { connectDB } from "./db";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("true-feedback-dev");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    database: mongodbAdapter(db),

    // adding a autogenerate username to database
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await connectDB();
                    await User.create({
                        name: user.name,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        username: user.email.split("@")[0],
                        image: user.image,
                        isAcceptingMessages: true,
                    });
                },
            },
            delete: {
                after: async (user) => {
                    try {
                        await connectDB();
                        const dbUser = await User.findOne({ email: user.email });
                        if (!dbUser) {
                            return;
                        }
                        await Message.deleteMany({ receiver: dbUser._id });
                        await dbUser.deleteOne();
                        console.log(`Successfully cleaned up Mongoose data for user: ${user.id}`);
                    } catch (error) {
                        console.error("Failed to delete Mongoose user during cleanup:", error);
                    }
                },
            },
        },
    },
    user: {
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

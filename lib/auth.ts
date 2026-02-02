import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware, username } from "better-auth/plugins";
import { ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("true-feedback-dev");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    database: mongodbAdapter(db),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            isAcceptingMessages: {
                type: "boolean",
                defaultValue: true,
            },
        },
    },
    plugins: [
        username({
            minUsernameLength: 3,
            maxUsernameLength: 20,
        }),
    ],
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            const newUser = ctx.context.newSession?.user;

            if (!newUser) return;
            const userDoc = await db.collection("user").findOne({ email: newUser.email });
            if (userDoc?.username) return;

            const generatedUsername = newUser.email.split("@")[0];
            console.log(generatedUsername);
            await db.collection("user").updateOne(
                { _id: new ObjectId(newUser.id) },
                {
                    $set: {
                        username: generatedUsername,
                        displayUsername: generatedUsername,
                    },
                },
            );
        }),
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});

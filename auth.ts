import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    plugins: [
        customSession(async ({ user, session }) => {
            await connectDB();
            const dbUser = await User.findOne({ email: user.email });
            return {
                user: {
                    ...user,
                    username: dbUser ? dbUser.username : null,
                    isCompletedProfile: !!dbUser,
                },
                session,
            };
        }),
    ],
    session: {
        expiresIn: 60 * 60 * 24 * 15, // 15 days
        updateAge: 60 * 60 * 24 * 7, // 7 days (every 7 days the session expiration is updated)
        freshAge: 0,
        disableSessionRefresh: true,
    },
});

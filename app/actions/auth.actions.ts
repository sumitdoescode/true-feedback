"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { AuthSchema, AuthType } from "@/schemas/auth.schema";
import { flattenError } from "zod";

export interface AuthState {
    success?: boolean;
    message?: string;
    error?: { username?: string[] };
}

export async function CompleteProfile(_: any, formData: AuthType) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
        return { success: false, message: "Unauthorized" };
    }

    //  validate the data against AuthSchema
    const { success, data, error } = AuthSchema.safeParse(formData);
    if (!success) {
        return { success: false, error: flattenError(error).fieldErrors };
    }

    const { username } = data;

    //    we don't' need to check username exists or not as we have already validated it using schema

    try {
        await connectDB();

        //    check if the username already exists
        const user = await User.findOne({ username: username });
        if (user) {
            return { success: false, error: { username: ["Username already exists"] } };
        }

        const { id, name, email, image, emailVerified } = session.user;

        await User.create({
            name,
            username,
            email,
            emailVerified,
            image,
        });

        return { success: true, message: "Profile completed successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function UpdateProfile(_: any, formData: AuthType) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
        return { success: false, message: "Unauthorized" };
    }

    //  validate the data against AuthSchema
    const { success, data, error } = AuthSchema.safeParse(formData);
    if (!success) {
        return { success: false, error: flattenError(error).fieldErrors };
    }

    const { username } = data;

    //    we don't' need to check username exists or not as we have already validated it using schema

    try {
        await connectDB();

        //    check if the username already exists
        const user = await User.findOne({ username: username });
        if (user) {
            return { success: false, error: { username: ["Username already exists"] } };
        }

        // update the username
        await User.findOneAndUpdate(
            { email: session?.user?.email },
            {
                username: username,
            }
        );

        return { success: true, message: "Username updated successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

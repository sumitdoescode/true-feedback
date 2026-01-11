"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { CompleteProfileSchema, CompleteProfileType } from "@/schemas/auth.schema";
import { flattenError } from "zod";

export interface CompleteProfileState {
    success?: boolean;
    message?: string;
    error?: { username?: string[] };
}

export async function completeProfile(_: any, formData: CompleteProfileType) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
        return { success: false, message: "Unauthorized" };
    }

    //  validate the data against completeProfileSchema
    const { success, data, error } = CompleteProfileSchema.safeParse(formData);
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

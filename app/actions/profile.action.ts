"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import { UpdateProfileSchema, UpdateProfileType } from "@/schemas/profile.schema";
import { flattenError } from "zod";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function UpdateProfile(formData: UpdateProfileType) {
    try {
        await connectDB();
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session?.user) {
            return { success: false, message: "Unauthorized" };
        }

        const user = await User.exists({ email: session?.user?.email });
        if (!user) {
            return { success: false, message: "Unauthorized" };
        }

        // validate the data against AuthSchema
        const { success, data, error } = UpdateProfileSchema.safeParse(formData);
        if (!success) {
            return { success: false, error: flattenError(error).fieldErrors };
        }

        const { username } = data;

        // check if the username already exists
        const usernameAlreadyExists = await User.exists({ username: username.toLowerCase() });
        if (usernameAlreadyExists) {
            return { success: false, error: { username: ["Username already exists"] } };
        }
        // update the username
        await User.findOneAndUpdate(
            { email: session?.user?.email },
            {
                $set: {
                    username: username.toLowerCase(),
                },
            },
        );

        return { success: true, message: "Username updated successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function DeleteProfile() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return { success: false, message: "Unauthorized" };
        }

        const user = await User.findOne({ email: session?.user?.email });
        if (!user) {
            return { success: false, message: "Unauthorized" };
        }

        // delete the user using better auth api
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

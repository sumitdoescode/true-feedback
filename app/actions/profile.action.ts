"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import { UpdateProfileSchema, UpdateProfileType } from "@/schemas/profile.schema";
import { flattenError } from "zod";

export async function UpdateProfile(formData: UpdateProfileType) {
    try {
        await connectDB();
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session?.user) {
            return { success: false, message: "Unauthorized" };
        }

        //  validate the data against AuthSchema
        const { success, data, error } = UpdateProfileSchema.safeParse(formData);
        if (!success) {
            return { success: false, error: flattenError(error).fieldErrors };
        }

        const { username } = data;

        //    we don't' need to check username exists or not as we have already validated it using schema

        // //    check if the username already exists
        // const user = await User.findOne({ username: username });
        // if (user) {
        //     return { success: false, error: { username: ["Username already exists"] } };
        // }

        // // update the username
        // await User.findOneAndUpdate(
        //     { email: session?.user?.email },
        //     {
        //         username: username,
        //     },
        // );

        return { success: true, message: "Username updated successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

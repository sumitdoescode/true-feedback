import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { Suspense } from "react";

const Page = async () => {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <UpdateProfileForm />
            </div>
        </div>
    );
};

export default Page;

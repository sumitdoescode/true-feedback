import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <UpdateProfileForm username={session?.user.username} />
            </div>
        </div>
    );
};

export default Page;

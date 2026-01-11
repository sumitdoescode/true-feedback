import { redirect } from "next/navigation";
import { AuthUser } from "@/components/AuthUser";
import { auth } from "@/auth";
import { headers } from "next/headers";

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    if (!session?.user?.isCompletedProfile) {
        redirect("/complete-profile");
    }

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <AuthUser usage="update" />
            </div>
        </div>
    );
};

export default page;

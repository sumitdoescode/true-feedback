import { redirect } from "next/navigation";
import { CompleteProfile } from "@/components/CompleteProfile";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function CompleteProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    if (!session?.user?.isCompletedProfile) {
        redirect("/dashboard");
    }

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <CompleteProfile />
            </div>
        </div>
    );
}

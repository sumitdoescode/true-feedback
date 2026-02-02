import { AuthUser } from "@/components/AuthUser";

export default async function CompleteProfilePage() {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <AuthUser usage="complete" />
            </div>
        </div>
    );
}

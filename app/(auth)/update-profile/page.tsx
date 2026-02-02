import { AuthUser } from "@/components/AuthUser";

const page = async () => {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <AuthUser usage="update" />
            </div>
        </div>
    );
};

export default page;

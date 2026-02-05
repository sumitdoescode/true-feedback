import UserProfile from "@/components/UserProfile";
import { Suspense } from "react";
import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";

const page = async ({ params }: { params: Promise<{ username: string }> }) => {
    return (
        <section className="grow py-10">
            <Suspense fallback={<UserProfileSkeleton />}>
                {params.then(({ username }) => {
                    return <UserProfile username={username} />;
                })}
            </Suspense>
        </section>
    );
};

export default page;

const UserProfileSkeleton = () => {
    return (
        <Container>
            {/* User Profile Header Skeleton */}
            <div className="flex items-center gap-6">
                {/* Avatar Skeleton */}
                <Skeleton className="w-28 h-28 rounded-full" />

                {/* User Info Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-9 w-48" />
                    <Skeleton className="h-6 w-32" />
                </div>
            </div>

            {/* Send Message Form Skeleton */}
            <div className="mt-8 space-y-4">
                {/* Textarea Skeleton */}
                <Skeleton className="h-30 w-full rounded-md" />

                {/* Buttons Skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-11 grow rounded-md" />
                    <Skeleton className="h-11 grow rounded-md" />
                </div>
            </div>
        </Container>
    );
};

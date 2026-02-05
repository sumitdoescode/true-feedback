import UserProfile from "@/components/UserProfile";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ username: string }> }) => {
    return (
        <section className="grow py-10">
            <Suspense fallback={<div>Loading...</div>}>
                <UserProfile params={params} />
            </Suspense>
        </section>
    );
};

export default page;

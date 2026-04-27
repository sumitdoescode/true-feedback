import Dashboard from "@/components/Dashboard";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/DashboardSkeleton";

const page = async () => {
    return (
        <section className="grow py-10">
            <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
            </Suspense>
        </section>
    );
};

export default page;

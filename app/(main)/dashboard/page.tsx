import Dashboard from "@/components/Dashboard";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/DashboardSkeleton";

const page = async () => {
    return (
        <section className="py-10 grow">
            <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
            </Suspense>
        </section>
    );
};

export default page;

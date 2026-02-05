import Dashboard from "@/components/Dashboard";
import { Suspense } from "react";

const page = async () => {
    return (
        <section className="py-10 grow">
            <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
            </Suspense>
        </section>
    );
};

export default page;

import Container from "./Container";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
    return (
        <section className="py-5 grow">
            <Container>
                <div className="space-y-8">
                    {/* Profile Row */}
                    <div className="flex items-center gap-8">
                        <Skeleton className="w-28 h-28 rounded-full" />

                        <div className="space-y-3">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <Skeleton className="h-10 w-44" />
                        <Skeleton className="h-10 w-36" />
                        <Skeleton className="h-10 w-28" />
                    </div>

                    {/* Toggle */}
                    <Skeleton className="h-12 w-64" />

                    {/* Messages */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-6 w-16" />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default DashboardSkeleton;

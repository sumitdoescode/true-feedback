import Container from "./Container";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
    return (
        <section className="py-5 grow">
            <Container>
                <div className="space-y-8">
                    {/* Profile Row */}
                    <div className="flex items-center gap-6">
                        <Skeleton className="w-28 h-28 rounded-full" />

                        <div className="space-y-3">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <Skeleton className="h-8 w-44" />
                        <Skeleton className="h-8 w-36" />
                        <Skeleton className="h-8 w-28" />
                        <Skeleton className="h-8 w-28" />
                    </div>

                    {/* Toggle */}
                    <Skeleton className="h-9 w-64" />

                    {/* Messages */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-28 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default DashboardSkeleton;

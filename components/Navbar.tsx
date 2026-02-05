import Link from "next/link";
import { Suspense } from "react";
import NavbarItems from "./NavbarItems";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = async () => {
    return (
        <nav className="py-3 md:py-5">
            <div className="container mx-auto px-2">
                <div className="flex items-center justify-between">
                    <div className="">
                        <Link href="/">
                            <p className="text-xl sm:text-2xl font-medium sm:font-bold leading-tight">
                                True <span className="text-primary">Feedback</span>
                            </p>
                        </Link>
                    </div>
                    <Suspense fallback={<NavbarItemsSkeleton />}>
                        <NavbarItems />
                    </Suspense>
                </div>
            </div>
        </nav>
    );
};

const NavbarItemsSkeleton = () => {
    return (
        <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-24" /> {/* Dashboard/Get Started button */}
            <Skeleton className="h-9 w-9 rounded-full" /> {/* User avatar */}
        </div>
    );
};

export default Navbar;

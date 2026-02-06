import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserButton from "./UserButton";

const NavbarItems = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // if not logged in
    if (!session?.user) {
        return (
            <div className="flex items-center gap-2">
                <Button className="" variant="outline">
                    <Link href="/login">Get Started</Link>
                </Button>
            </div>
        );
    }

    // if logged in
    return (
        <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/dashboard" className="">
                <Button className="" variant="outline">
                    Dashboard
                </Button>
            </Link>
            <UserButton user={session.user} />
        </div>
    );
};

export default NavbarItems;

"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignUp, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className="py-3 md:py-5">
            <div className="container mx-auto px-2">
                <div className="flex items-center justify-between">
                    <div className="">
                        <Link href="/">
                            <p className="text-2xl md:text-3xl font-medium sm:font-bold leading-1">True Feedback</p>
                        </Link>
                    </div>
                    <SignedIn>
                        <div className="flex items-center gap-8">
                            {pathname !== "/dashboard" && (
                                <Link href="/dashboard">
                                    <Button className="text-base font-semibold rounded-lg" variant="outline">
                                        Dashboard
                                    </Button>
                                </Link>
                            )}
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2">
                            <Button className="text-base font-semibold rounded-lg" variant="outline">
                                <Link href="/sign-in">Get Started</Link>
                            </Button>
                        </div>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

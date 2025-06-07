import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
    return (
        <section>
            <div className="container mx-auto px-2 flex items-center justify-center h-screen">
                <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Oops :(</h1>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
                        <span className="text-primary bg-primary-foreground px-2">404</span> Page not found.
                    </h1>
                    <Link href="/">
                        <Button className="mt-4 cursor-pointer" size={"lg"}>
                            Go to home
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;

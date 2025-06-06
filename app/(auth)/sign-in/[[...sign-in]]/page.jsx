import React from "react";
import { SignIn } from "@clerk/nextjs";

const page = () => {
    return (
        <section className="pt-20">
            <div className="container mx-auto px-2">
                <div className="flex items-center justify-center">
                    <SignIn fallbackredirecturl="/" />
                </div>
            </div>
        </section>
    );
};

export default page;

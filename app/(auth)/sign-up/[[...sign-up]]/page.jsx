import React from "react";
import { SignUp } from "@clerk/nextjs";

const page = () => {
    return (
        <section className="pt-10">
            <div className="container mx-auto px-2">
                <div className="flex items-center justify-center relative z-30">
                    <SignUp fallbackredirecturl="/" />
                </div>
            </div>
        </section>
    );
};

export default page;

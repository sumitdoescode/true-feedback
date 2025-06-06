import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="">
            <div className="container mx-auto px-2">
                <p className="text-base md:text-xl text-center py-2">
                    Made with ❤️ by
                    <Link href="https://github.com/sumitdoescode" target="_blank" className="text-primary bg-neutral-950 px-2">
                        sumitdoescode
                    </Link>
                    {/* <span className="text-primary bg-neutral-950 px-1"></span> */}
                </p>
            </div>
        </div>
    );
};

export default Footer;

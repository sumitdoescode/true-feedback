import React from "react";
import Link from "next/link";

const Footer = () => {
   return (
      <div className="">
         <div className="container mx-auto px-2">
            <p className="text-base text-center py-2">
               Design & Developed by
               <Link href="https://sumitdoescode.vercel.app/" target="_blank" className="text-primary bg-neutral-950 px-1 underline">
                  sumitdoescode
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Footer;

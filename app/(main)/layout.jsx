import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default layout;

"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const CopyButton = ({ link }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setIsCopied(true);
            toast.success("Link copied");
            setTimeout(() => setIsCopied(false), 10000);
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    return (
        <Button className="" size={"sm"} variant="" onClick={copyLink}>
            {isCopied ? "Copied!" : "Copy Link"}
        </Button>
    );
};

export default CopyButton;

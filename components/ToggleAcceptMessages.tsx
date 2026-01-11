"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import axios from "axios";

const ToggleAcceptMessages = ({ isAcceptingMessages }: { isAcceptingMessages: boolean }) => {
    const [acceptingMessages, setAcceptingMessages] = useState<boolean>(isAcceptingMessages);

    const toggleAcceptMessages = async () => {
        try {
            const { data } = await axios.patch("/api/user");
            if (!data.success) {
                toast.error(data.message);
                setAcceptingMessages((prev) => !prev);
                return;
            }
            toast.success(data.data.isAcceptingMessages ? "Accepting messages enabled" : "Accepting messages disabled");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
            setAcceptingMessages((prev) => !prev);
        }
    };
    const handleCheckChange = (checked: boolean) => {
        setAcceptingMessages(checked);
        toggleAcceptMessages();
    };
    return (
        <div className="flex items-center justify-between w-full md:max-w-md space-x-2 mt-6 bg-neutral-900 border px-4 py-2 rounded-md">
            <Label htmlFor="toggle-accept-messages" className={"text-base text-neutral-200"}>
                Accept Messages
            </Label>
            <Switch checked={acceptingMessages} onCheckedChange={handleCheckChange} id="toggle-accept-messages" />
        </div>
    );
};

export default ToggleAcceptMessages;

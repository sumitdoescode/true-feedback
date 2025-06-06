import React from "react";
import { Input } from "@/components/ui/input";
import CopyButton from "@/components/CopyButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Messages from "@/components/Messages";

const feedbacks = [
    {
        id: 1,
        content: "I really liked your recent post",
        time: "2 hours ago",
    },
    {
        id: 2,
        content: "If you could go back in time, what would you change?",
        time: "1 day ago",
    },
    {
        id: 3,
        content: "Do you think AI will take over the world?",
        time: "3 hours ago",
    },
    {
        id: 4,
        content: "What is the best way to learn a new language?",
        time: "10 mins ago",
    },
    {
        id: 5,
        content: "Do you have any book recommendations?",
        time: "5 days ago",
    },
];

const page = () => {
    return (
        <section className="flex-grow-1 py-10">
            <div className="container mx-auto px-2">
                <h1 className="text-2xl md:text-3xl font-semibold">
                    Hello, <span className="text-primary bg-primary-foreground px-2">sumitdoescode</span>
                </h1>
                <h3 className="mt-10 text-base">Share your unique link</h3>
                <div className="max-w-2xl mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <p className="px-4 py-2 text-white text-base border rounded-md bg-zinc-950">https://truefeedback.vercel.app/sign-in/sumitdoescode</p>
                    <CopyButton link={"https://truefeedback.vercel.app/sign-in/sumitdoescode"} />
                </div>

                {/* toggle accept messages */}
                <div className="flex items-center space-x-2 mt-5">
                    <Label htmlFor="toggle-accept-messages" className={"text-xl"}>
                        Accepting Messages :
                    </Label>
                    <Switch id="toggle-accept-messages" size="lg" />
                </div>
                <Messages />
            </div>
        </section>
    );
};

export default page;

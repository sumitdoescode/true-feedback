"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import CopyButton from "@/components/CopyButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Messages from "@/components/Messages";
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const page = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isAcceptingMessages, setIsAcceptingMessages] = useState(false);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/users");
            setData(data);
            setIsAcceptingMessages(data.isAcceptingMessages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Failed to fetch user data");
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const toggleAcceptMessages = async () => {
        try {
            setLoading(true);
            const { data } = await axios.patch(`/api/users`);
            if (data.success) {
                if (data.isAcceptingMessages) {
                    setIsAcceptingMessages(true);
                    toast.success("You are now accepting messages");
                } else {
                    setIsAcceptingMessages(false);
                    toast.error("You are no longer accepting messages");
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Failed to toggle accepting messages");
        }
    };

    const profileLink = `https://true-feedback-eight-rho.vercel.app/u/${data.username}`;

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="flex-grow-1 pt-10 pb-20">
            <div className="container mx-auto px-2">
                <h1 className="text-2xl md:text-3xl font-semibold leading-0">
                    hello, <span className="text-3xl md:text-4xl text-primary bg-primary-foreground px-2">{data?.username}</span>
                </h1>
                <h3 className="mt-10 text-base text-neutral-400">Share your unique link</h3>
                <div className="max-w-2xl mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <p className="px-4 py-2 text-white text-base border rounded-md bg-zinc-950">{profileLink}</p>
                    <CopyButton link={profileLink} />
                </div>

                {/* toggle accept messages */}
                <div className="flex items-center space-x-2 mt-10 bg-neutral-950 border px-4 py-2 rounded-md">
                    <Label htmlFor="toggle-accept-messages" className={"text-lg"}>
                        Accepting Messages :
                    </Label>
                    <Switch id="toggle-accept-messages" size="lg" checked={isAcceptingMessages} onCheckedChange={toggleAcceptMessages} />
                </div>
                <Messages messages={data.messages} refetch={fetchUserData} />
            </div>
        </section>
    );
};

export default page;

"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// page to send message to a user by their username
const page = () => {
    const [content, setContent] = useState("");
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isAcceptingMessages, setIsAcceptingMessages] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const username = params.username;

    const validateUsername = async () => {
        try {
            setLoading(true);

            // api call to check if the username is valid
            const { data } = await axios.get(`/api/users/${username.trim()}/validate`);
            if (data.success) {
                if (data.isValidUsername) {
                    return setIsValidUsername(true);
                }
                setIsValidUsername(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setIsValidUsername(false);
            console.log(error);
        }
    };

    const acceptingMessages = async () => {
        try {
            setLoading(true);

            // api call to check if the user is accepting messages
            const { data } = await axios.get(`/api/users/${username.trim()}`);
            if (data.success) {
                setIsAcceptingMessages(data.isAcceptingMessages);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Failed to check if user is accepting messages");
        }
    };

    const sendMessage = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/users/${username.trim()}`, { content: content.trim() });
            if (data.success) {
                toast.success("Message sent successfully");
            }
            setContent("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Failed to send message");
        }
    };

    useEffect(() => {
        validateUsername();
        acceptingMessages();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="py-20 flex-grow-1">
            <div className="container mx-auto px-2">
                {isValidUsername ? (
                    // if username is valid
                    isAcceptingMessages ? (
                        // user is accepting messages
                        <div>
                            <h1 className="text-2xl font-bold mb-4">
                                Send Message to <span className="text-primary bg-primary-foreground px-2">{username}</span>
                            </h1>
                            <Textarea placeholder="Type your message here." value={content} onChange={(e) => setContent(e.target.value)} className={"text-white !text-base !bg-zinc-950"} />
                            <Button variant={"outline"} className={"!bg-zinc-950 mt-3 cursor-pointer w-full md:w-auto"} size={"lg"} onClick={sendMessage}>
                                Send
                            </Button>
                        </div>
                    ) : (
                        // user is not accepting messages
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-semibold">Oops :(</h1>
                            <h1 className="text-2xl md:text-3xl font-bold mb-4 mt-6">
                                <span className="text-primary bg-primary-foreground px-2">{username.trim()}</span> is not a accepting messages currently.
                            </h1>
                        </div>
                    )
                ) : (
                    // if username is not valid
                    <h1 className="text-2xl md:text-3xl font-bold text-center">
                        <span className="text-primary bg-primary-foreground px-2">{username}</span> is not a valid username.
                    </h1>
                )}
            </div>
        </section>
    );
};

export default page;

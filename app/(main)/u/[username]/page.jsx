"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

// page to send message to a user by their username
const page = () => {
    const [message, setMessage] = useState("");
    const params = useParams();
    const username = params.username;

    const validateUserame = async () => {
        const response = await axios.get(`/api/user/${username}/validate`);
        console.log(response.data);
    };

    useEffect(() => {
        validateUserame();
    }, []);
    return (
        <section className="py-20 flex-grow-1">
            <div className="container mx-auto px-2">
                <h1 className="text-2xl font-bold mb-4">
                    Send Message to <span className="text-primary bg-primary-foreground px-2">{username}</span>
                </h1>
                <Textarea placeholder="Type your message here." value={message} onChange={(e) => setMessage(e.target.value)} className={"text-white !text-base !bg-zinc-950"} />
                <Button variant={"outline"} className={"!bg-zinc-950 mt-3"} size={"lg"}>
                    Send
                </Button>
            </div>
        </section>
    );
};

export default page;

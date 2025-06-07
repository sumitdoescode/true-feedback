"use client";
import React from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Messages = ({ messages, refetch }) => {
    dayjs.extend(relativeTime);
    const deleteMessage = async (_id) => {
        try {
            const { data } = await axios.delete(`/api/messages/${_id}`);
            if (data.success) {
                toast.success("Message deleted successfully");
                refetch(); // Refetch messages after deletion
            }
        } catch (error) {
            console.log("Failed to delete message:", error);
            toast.error("Failed to delete message");
        }
    };

    if (!messages || messages.length === 0) {
        return <h1 className="text-2xl font-medium mt-10">No messages yet :(</h1>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {messages?.length &&
                messages.map(({ _id, content, createdAt }) => {
                    return (
                        <Card className={"bg-neutral-950"} key={_id}>
                            <CardHeader className="">
                                <CardTitle className={"text-lg md:text-xl font-semibold"}>{content}</CardTitle>
                                <p className="text-neutral-300 text-xs sm:text-sm">{dayjs(createdAt).fromNow()}</p>
                            </CardHeader>
                            <CardFooter className="">
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button className="cursor-pointer" variant={"outline"}>
                                            <Trash2 size={30} />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>This action cannot be undone. This will permanently delete your message</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteMessage(_id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    );
                })}
        </div>
    );
};

export default Messages;

import React from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    {
        id: 6,
        content: "Do you have any book recommendations? this is some really really long text to test the responsiveness of the card",
        time: "5 days ago",
    },
];
const Messages = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {feedbacks.map(({ id, content, time }) => {
                return (
                    <Card className={"bg-neutral-950"} key={id}>
                        <CardHeader className="">
                            <CardTitle className={"text-lg md:text-xl font-semibold"}>{content}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <div>
                                <p className="text-neutral-300 text-xs sm:text-sm">{time}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="">
                            <Button className="cursor-pointer" variant={"outline"}>
                                <Trash2 className="" size={30} />
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
};

export default Messages;

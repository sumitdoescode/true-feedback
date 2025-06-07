"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

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

export default function Home() {
    return (
        <section className="py-10 flex-grow-1">
            <div className="container mx-auto px-2">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Dive into the world of Anonymous <span className="text-rose-600">Feedback</span>
                    </h1>
                    <p className="mt-3 text-zinc-200 text-base md:text-lg">True Feedback - Where you identity remains a secret</p>
                </div>
                <div>
                    <Carousel
                        className="mt-10 max-w-xl mx-auto"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {feedbacks.map(({ id, content, time }) => {
                                return (
                                    <CarouselItem key={id} className="w-full">
                                        <Card className={"bg-zinc-950"}>
                                            <CardHeader>
                                                <CardTitle className={"text-lg md:text-xl font-semibold"}>Message from Anonymous</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex items-center gap-4">
                                                <Mail />
                                                <div>
                                                    <p className="text-lg md:text-xl font-medium  text-rose-500">{content}</p>
                                                    <p className="text-neutral-300 text-xs sm:text-sm">{time}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

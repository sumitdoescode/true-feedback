"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
        <section className="py-20 grow">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-200">
                            Dive into the world of Anonymous <span className="text-primary">Feedback</span>
                        </h1>
                        <p className="mt-3 text-neutral-300 text-base md:text-lg">True Feedback - Where you identity remains a secret</p>
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
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className={"text-base md:text-lg font-semibold"}>Message from Anonymous</CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex items-center gap-4">
                                                    <div className="p-2 bg-neutral-800 rounded">
                                                        <Mail className="text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-base font-medium text-neutral-300">{content}</p>
                                                        <p className="text-neutral-400 text-xs">{time}</p>
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
                    <div className="flex items-center max-w-xl mx-auto justify-center mt-2 sm:mt-6">
                        <Link href="/login" className="w-full">
                            <Button className={"text-base w-full rounded-full"} size={"lg"} variant={"default"}>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}

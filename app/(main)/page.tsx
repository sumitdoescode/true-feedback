import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeCarousel from "@/components/HomeCarousel";

export default function Home() {
    return (
        <section className="py-20 grow">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* headings */}
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-200">
                            Dive into the world of Anonymous <span className="text-primary">Feedback</span>
                        </h1>
                        <p className="mt-3 text-neutral-300 text-base md:text-lg">True Feedback - Where you identity remains a secret</p>
                    </div>

                    {/* carousel */}
                    <HomeCarousel />

                    {/* buttons */}
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

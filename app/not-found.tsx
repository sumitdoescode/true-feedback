import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
    return (
        <section className="py-40 grow">
            <Container>
                <div className="text-center">
                    <h1 className="text-7xl font-bold text-neutral-200">404</h1>
                    <h1 className="text-xl font-medium text-neutral-300 mt-3">Page you are looking for does not exists</h1>
                    <Link href="/">
                        <Button className="mt-4 cursor-pointer" size={"lg"} variant={"default"}>
                            Go to home
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}

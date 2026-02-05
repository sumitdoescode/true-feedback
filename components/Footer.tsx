import Link from "next/link";
import Container from "./Container";

const Footer = () => {
    return (
        <div className="bg-neutral-900 py-2">
            <Container>
                <p className="text-sm text-center">
                    Design & Developed by
                    <Link href="https://sumitdoescode.vercel.app/" target="_blank" className="text-primary bg-neutral-950 px-1 underline">
                        sumitdoescode
                    </Link>
                </p>
            </Container>
        </div>
    );
};

export default Footer;

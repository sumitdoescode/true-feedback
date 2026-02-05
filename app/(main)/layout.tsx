import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}

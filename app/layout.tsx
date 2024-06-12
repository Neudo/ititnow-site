import { GeistSans } from "geist/font/sans";
import "./globals.css";
import {Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import BodyClassManager from "@/components/BodyClassManager";
import {ReactQueryProvider} from "@/app/react-query-provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans"
})

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Ititnow - Découvrez de nouvelles saveurs",
    description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
        <body className={cn(
            "min-h-svh font-sans antialiased",
            fontSans.variable)}>
        <BodyClassManager />
        <ReactQueryProvider>
            <main className="min-h-svh flex flex-col items-center">
                {children}
            </main>
        </ReactQueryProvider>
        </body>
        </html>
    );
}

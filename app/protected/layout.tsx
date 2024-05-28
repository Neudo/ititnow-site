import { GeistSans } from "geist/font/sans";
import "../globals.css";
import Header from "@/components/admin/Header";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import HomeAdmin from "@/components/admin/HomeAdmin";
import HomeCustomer from "@/components/admin/HomeCustomer";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Ititnow",
    description: "The fastest way to build apps with Next.js and Supabase",
};



export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const {data:UserLogged} = await supabase.from('Users').select('*').eq('id', user.id).single()
    const isAdmin = UserLogged.isAdmin
    return (


        <div className="flex-1 w-full lg:ml-[29rem] flex flex-col gap-20 items-center min-h-full">
            <div className="w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
                        <Header isAdmin={isAdmin}/>
                    </div>
                </nav>
            </div>

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <main className="flex-1 flex flex-col gap-6">
                    {children}
                </main>
            </div>

            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                    <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        Ititnow
                    </a>
                </p>
            </footer>
        </div>
    );
}

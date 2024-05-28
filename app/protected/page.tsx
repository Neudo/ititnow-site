import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HomeAdmin from "@/components/admin/HomeAdmin";
import HomeCustomer from "@/components/customer/HomeCustomer";
import Header from "@/components/admin/Header";

export default async function ProtectedPage() {
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
    <div className="flex-1 w-full flex flex-col gap-20 items-center bg-slate-200">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
            <Header/>
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          {isAdmin ? <HomeAdmin/> : <HomeCustomer/>}
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

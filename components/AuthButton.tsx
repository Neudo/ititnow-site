import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Salut, {user.email}!
      <a className="p-2 border rounded-md border-white "  href="/protected">Tableau de bord</a>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md text-black no-underline bg-btn-background hover:bg-btn-background-hover">
          Déconnexion
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline text-black bg-btn-background hover:bg-btn-background-hover"
    >
      Connexion / Inscription
    </Link>
  );
}

import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

const origin = process.env.NEXT_PUBLIC_ORIGIN;

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline primary-green-linear flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Retour
      </Link>

      <form
          className="animate-in flex bg-white p-6 rounded-lg shadow-lg flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="hello@exemple.com"
            required
        />
        <label className="text-md" htmlFor="password">
          Mot de passe
        </label>
        <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
        />
        <SubmitButton
            formAction={signIn}
            className="primary-green-linear rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Patientez..."
        >
          Connexion
        </SubmitButton>
        <p className="mt-4 p-4 bg-slate-300 rounded-lg text-foreground text-center">
          Pas encore de compte ? <br/> <a className="text-blue-500" href="/register">Cliquez ici pour vous inscrire.</a></p>
        {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
        )}
      </form>
    </div>
  );
}

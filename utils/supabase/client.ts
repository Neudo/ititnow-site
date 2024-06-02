import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );


export const getCurrentUser = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser()
  console.log(user)
  return user;
}

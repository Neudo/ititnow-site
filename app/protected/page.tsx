import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HomeAdmin from "@/components/admin/HomeAdmin";
import HomeCustomer from "@/components/admin/HomeCustomer";

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

  return (<div>
        {isAdmin ? <HomeAdmin userData={UserLogged} /> : <HomeCustomer/>}
      </div>

  );
}

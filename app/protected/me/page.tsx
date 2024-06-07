import { createClient } from '@/utils/supabase/server'
import EditUserForm from "@/components/forms/EditUserForm";
import { UserProfile } from "@/components/forms/EditUserForm"; // import UserProfile type

export default async function Page() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (user) {
        return <EditUserForm user={user as unknown as UserProfile} />
    } else {
        return <div className="text-red-500" >Vous devez être connecté pour accéder à cette page</div>;
    }
}

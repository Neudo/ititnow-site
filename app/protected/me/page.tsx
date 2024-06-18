import { createClient } from '@/utils/supabase/server'
import EditUserForm from "@/components/forms/EditUserForm";
import EditEstablishmentFrom from "@/components/forms/EditEstablishmentForm";
import { UserProfile } from '@/@types/user'

export default async function Page() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return(

        <>
            <EditUserForm user={user as UserProfile} />
            <EditEstablishmentFrom user={user as UserProfile} />
        </>
    )
}

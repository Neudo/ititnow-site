import { createClient } from '@/utils/supabase/server'
import EditUserForm from "@/components/forms/EditUserForm";

export default async function Page() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return <EditUserForm user={user} />
}

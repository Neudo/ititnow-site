import AccountForm from '@/components/forms/AccountForm'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return <AccountForm user={user} />
}

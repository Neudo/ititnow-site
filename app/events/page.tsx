import { createClient } from '@/utils/supabase/server'

export default async function Page() {
    const supabase = createClient();
    console.log('start -----------------', supabase, '----------------');

    const { data: Events, error } = await supabase.from('Events').select('*');

    if (error) {
        console.error('Error fetching events:', error);
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    }

    console.log('Events:', Events);

    return <pre>{JSON.stringify(Events, null, 2)}</pre>;
}

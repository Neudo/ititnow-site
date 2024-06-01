import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: userLogged, error: userError } = await supabase
        .from('Users')
        .select('*')
        .eq('id', user?.id)
        .single();

    if (userError) {
        return res.status(401).json({ error: 'User not found' });
    }

    res.status(200).json(userLogged);
}

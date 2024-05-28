
import React from 'react';
import {createClient} from "@/utils/supabase/server";

async function Introduction() {
    const supabase = createClient();
    const {data: Events, error} = await supabase.from('Events').select('*');

    return (
        <div>
            <p>Il y a acctuellement {Events?.length} évènements actifs en ce moment.</p>
        </div>
    );
}

export default Introduction;

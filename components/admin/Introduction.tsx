import React from 'react';
import {createClient} from "@/utils/supabase/server";
import SmallCard from "@/components/SmallCard";
import BigCard from "@/components/BigCard";

async function Introduction() {
    const supabase = createClient();
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const { data: EventsNow } = await supabase
        .from('Events')
        .select('*')
        .gte('startDate', today.toISOString())
        .lt('startDate', tomorrow.toISOString())
    const {data: Events, error} = await supabase.from('Events').select('*');
    const {data: Users} = await supabase.from('Users').select('*');

    return (
        <div className="flex gap-5 flex-col md:flex-row flex-wrap">
            <SmallCard title={"Évènements"} number={Events?.length} color={"#000"} picto={"events"} />
            <SmallCard title={"Nombre d'utilisateurs"} number={Users?.length} color={'#51796F'} picto={"people"} />
            <SmallCard title={"Évènements en ce moment"} number={EventsNow?.length} color={'#245759'} picto={"event-now"} />
            <BigCard title={"Big card"}/>
        {/*BigCard graphique inscrit sur le mois */}
        {/*BigCard graphique events sur le mois */}
        </div>
    );
}

export default Introduction;

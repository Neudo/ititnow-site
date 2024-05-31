import React from 'react';
import {createClient} from "@/utils/supabase/server";
import SmallCard from "@/components/SmallCard";

async function Introduction() {
    const supabase = createClient();
    const {data: Events, error} = await supabase.from('Events').select('*');

    return (
        <div className="flex gap-5 flex-col md:flex-row flex-wrap">
            <SmallCard title={"Évènements"} number={Events?.length} color={"#000"} picto={"events"} />
            <SmallCard title={"Nombre d'utilisateurs"} number={Events?.length} color={'#51796F'} picto={"people"} />
        {/*SmallCard events en cours*/}
        {/*SmallCard events à venir */}
        {/*BigCard graphique inscrit sur le mois */}
        {/*BigCard graphique events sur le mois */}

        </div>
    );
}

export default Introduction;

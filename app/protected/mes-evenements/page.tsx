"use client"
import {createClient} from "@/utils/supabase/client";
import React, {useEffect} from "react";
import ListEvents from "@/components/admin/ListMyEvents";
import {Button} from "@/components/ui/button";

function Page() {
    const [userId, setUserId] = React.useState<string | null>(null);
    const [myEvents, setMyEvents] = React.useState<any>(null);
    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: userLogged } = await supabase.auth.getUser();
            if (userLogged && userLogged.user) {
                setUserId(userLogged.user.id);
            }
        };
        fetchUser();
    }, [myEvents]);

    useEffect(() => {
        if (userId && myEvents === null) {
            fetchEvents();
        }
    }, [userId]);

    const fetchEvents = async () => {
        const supabase = createClient();
        const {data: myEvents, error} = await supabase.from('Events').select('*').eq('userId', userId)
        if (error) {
            console.error('Error fetching events:', error);
        }
        setMyEvents(myEvents);
    }
    return (
        <>
            <Button className="w-[200px]" title="Ajouter un évènement">
                <a href="/protected/mes-evenements/evenement"
                   className="text-white">Ajouter un évènement</a>
            </Button>

            {userId && <ListEvents events={myEvents}/>}
        </>
    );
}

export default Page;

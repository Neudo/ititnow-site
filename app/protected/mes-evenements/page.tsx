"use client"
import {createClient} from "@/utils/supabase/client";
import React, {useEffect} from "react";
import ListMyEvents from "@/components/admin/ListMyEvents";
import {Button} from "@/components/ui/button";

function Page() {
    const [userId, setUserId] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: userLogged } = await supabase.auth.getUser();
            if (userLogged && userLogged.user) {
                setUserId(userLogged.user.id);
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            <Button className="w-[200px]" title="Ajouter un évènement">
                <a href="/protected/mes-evenements/evenement"
                   className="text-white">Ajouter un évènement</a>
            </Button>

            {userId && <ListMyEvents userId={userId}/>}
        </>
    );
}

export default Page;

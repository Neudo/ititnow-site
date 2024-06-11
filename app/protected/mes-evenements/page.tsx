"use client"
import {createClient} from "@/utils/supabase/client";
import React, {useEffect} from "react";
import ListMyEvents from "@/components/admin/ListMyEvents";

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
            <a href="/protected/mes-evenements/evenement" className="text-blue-500">Ajouter un évènement</a>
            {userId && <ListMyEvents userId={userId} />}
        </>
    );
}

export default Page;

"use client"
import {createClient} from "@/utils/supabase/client";
import React, {useEffect} from "react";
import NewEventForm from "@/components/forms/NewEventForm";
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
            {userId && <NewEventForm userId={userId} />}
            {userId && <ListMyEvents userId={userId} />}
        </>
    );
}

export default Page;

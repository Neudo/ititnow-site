"use client"
import React, {useEffect} from 'react';
import {createClient} from "@/utils/supabase/client";
import NewEventForm from "@/components/forms/NewEventForm";

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
            {userId && <NewEventForm userId={userId}  oldEvent={null} />}
        </>
    )
}

export default Page;

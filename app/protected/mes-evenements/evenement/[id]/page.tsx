'use client'
import { useParams } from 'next/navigation'
import React, {useEffect} from 'react';
import NewEventForm from "@/components/forms/NewEventForm";
import {createClient} from "@/utils/supabase/client";



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
    const { id } = useParams();
    return (
        <div>
            {userId && <NewEventForm userId={userId} oldEvent={id} />}
        </div>
    );
}

export default Page;

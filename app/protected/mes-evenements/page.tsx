"use client"
import {createClient} from "@/utils/supabase/client";
import React, {useEffect, useState} from "react";
import ListEvents from "@/components/admin/ListMyEvents";
import {Button} from "@/components/ui/button";
import {PaginationComponent} from "@/components/PaginationComponent";
import {SearchParamsProps} from "@/app/protected/events/page";

function Page({searchParams}: Readonly<SearchParamsProps>) {
    const [userId, setUserId] = React.useState<string | null>(null);
    const [myEvents, setMyEvents] = React.useState<any>(null);
    const [totalEvents, setTotalEvents] = useState<number>(0);
    const PAGE_SIZE = 10
    const pageCount = Math.ceil(totalEvents / PAGE_SIZE);
    const currentPage = Number(searchParams?.page) || 1;

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
        const startIdx = (currentPage - 1) * PAGE_SIZE;
        const endIdx = startIdx + PAGE_SIZE - 1;
        const {data: myEvents, error, count} = await supabase
            .from('Events')
            .select('*')
            .eq('userId', userId)
            .range(startIdx, endIdx);

        if (error) {
            console.error('Error fetching events:', error);
        }
        setMyEvents(myEvents);
        setTotalEvents(count || 0);
    }
    return (
        <>
            <Button className="w-[200px]" title="Ajouter un évènement">
                <a href="/protected/mes-evenements/evenement"
                   className="text-white">Ajouter un évènement</a>
            </Button>

            {userId &&
                <>
                <ListEvents events={myEvents} pageCount={pageCount}/>
                </>
            }
        </>
    );
}

export default Page;

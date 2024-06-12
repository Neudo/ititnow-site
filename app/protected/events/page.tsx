"use client"
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from "react";
import ListEvents from "@/components/admin/ListMyEvents";

interface Event {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    status: string;
    author: string;
    contact: string;
}

export default function Page() {
    const [events, setEvents] = useState<any>(null);

    useEffect(() => {
        const fetchEvents = () => {
            const supabase = createClient();
            supabase.from('Events').select('*')
                .then(({ data: events, error }) => {
                    if (error) {
                        console.error('Error fetching events:', error);
                    } else {
                        setEvents(events);
                    }
                });
        }
        fetchEvents();
    }, [events]);

    return (
        <>
            {events && <ListEvents events={events}/>}
        </>
    );
}

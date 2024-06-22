"use client"
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from "react";
import ListEvents from "@/components/admin/ListMyEvents";
import {PaginationComponent} from "@/components/PaginationComponent";

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

export interface SearchParamsProps {
    searchParams?: {
        query?: string
        page?: string
    }
}

export default function Page({searchParams}: Readonly<SearchParamsProps>) {
    const [events, setEvents] = useState<any>(null);
    const [totalEvents, setTotalEvents] = useState<number>(0);
    const [refreshKey, setRefreshKey] = useState<number>(0); // New state variable
    const currentPage = Number(searchParams?.page) || 1;
    const PAGE_SIZE = 10


    useEffect(() => {
        const fetchEvents = async () => {
            console.log('fetching events')
            const supabase = createClient();
            const startIdx = (currentPage - 1) * PAGE_SIZE;
            const endIdx = startIdx + PAGE_SIZE - 1;

            const { data: events, error, count } = await supabase
                .from('Events')
                .select('*', { count: 'exact' })
                .range(startIdx, endIdx);

            if (error) {
                console.error('Error fetching events:', error);
            } else {
                setEvents(events);
                setTotalEvents(count || 0);
            }
        }
        fetchEvents();
    }, [currentPage, refreshKey]);

    const refreshEvents = () => {
        setRefreshKey(oldKey => oldKey + 1);
    }

    const pageCount = Math.ceil(totalEvents / PAGE_SIZE);

    return (
        <>
            {events &&
                <>
                    <ListEvents events={events} pageCount={pageCount} refreshEvents={refreshEvents} />
                </>
            }
        </>
    );
}

"use client"
import React, {useEffect} from 'react';
import {Button} from "@/components/ui/button";
import {getCurrentUser} from "@/utils/supabase/client";
import NewEventForm from "@/components/forms/NewEventForm";

function Page() {

    useEffect(() => {
        getCurrentUser()
    }, []);

    return (
        <>
            <NewEventForm/>
        </>
    );
}

export default Page;

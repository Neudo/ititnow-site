"use client"
import React from 'react';
import {createClient} from "@/utils/supabase/client";

async function Server() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()


    return (
        <div></div>
    );
}

export default Server;

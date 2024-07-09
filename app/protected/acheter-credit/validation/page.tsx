'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";

const ValidationPage = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    const token = searchParams.get('token');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [eventGiven, setEventGiven] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    // Fetch user
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

    const incrementNBEvents = async (userId: string) => {
        const supabase = createClient();

        // Step 1: Fetch current value of nBEvents
        const { data: users, error } = await supabase
            .from('Users')
            .select('nBEvents')
            .eq('id', userId);

        if (error) {
            console.error('Error fetching user:', error.message);
            return false;
        }

        if (!users || users.length === 0) {
            console.error('No user found with userId:', userId);
            return false;
        }

        const currentNBEvents = users[0].nBEvents;
        const newNBEvents = currentNBEvents + 1;

        // Step 2: Update nBEvents with incremented value
        const { data: updatedUser, updateError } = await supabase
            .from('Users')
            .update({ nBEvents: newNBEvents })
            .eq('id', userId);

        if (updateError) {
            console.error('Error updating nBEvents:', updateError.message);
            return false;
        }

        if (updatedUser) {
            console.log('nBEvents incremented successfully:', updatedUser);
            return true;
        }

        return false;
    };

    useEffect(() => {
        const verifySession = async () => {
            if (!session_id || !token) {
                setLoading(false);
                return;
            }

            const response = await fetch(`http://localhost:8000/stripe/verify-session?sessionId=${session_id}&token=${token}`);
            const result = await response.json();

            if (result.isValid) {
                setIsValid(true);
            }
            setLoading(false);
        };

        verifySession();
    }, [session_id, token]);

    useEffect(() => {
        const updateUserEvents = async () => {
            if (isValid && userId && !eventGiven) {
                const success = await incrementNBEvents(userId);
                if (success) {
                    setEventGiven(true);
                }
            }
        };

        updateUserEvents();
    }, [isValid, userId, eventGiven]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isValid) {
        return <div>Lien invalide ...</div>;
    }

    return (
        <div>
            <h1>Paiement réussis</h1>
        </div>
    );
};

export default ValidationPage;

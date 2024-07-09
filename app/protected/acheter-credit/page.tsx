'use client'
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import React, {useEffect} from "react";
import {createClient} from "@/utils/supabase/client";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? '');

const CheckoutPage = () => {
    const router = useRouter();
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



    const handleCheckout = async () => {
        const response = await fetch('http://localhost:8000/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId: 'price_1PaarVIfzThbqD5IrGRf2riW',
                successUrl: 'http://localhost:3000/protected/acheter-credit/validation',
                cancelUrl: 'http://localhost:3000/protected/acheter-credit/echec',
                userId: userId || '',
            }),
        });

        if (response.ok) {
            const session = await response.json();
            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({ sessionId: session.sessionId });

        } else {
            const errorText = await response.text();
            console.error('Failed to create checkout session', errorText);
        }
    };

    return (
        <button onClick={handleCheckout}>
            Acheter un crédit
        </button>
    );
};

export default CheckoutPage;

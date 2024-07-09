'use client'
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? '');

const CheckoutPage = () => {
    const router = useRouter();

    const handleCheckout = async () => {
        const response = await fetch('http://localhost:8000/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: 'price_1PaarVIfzThbqD5IrGRf2riW',
                successUrl: 'http://localhost:3000/protected/acheter-credit/validation',
                cancelUrl: 'http://localhost:3000/protected/acheter-credit/echec'
            }),
        });

        if (response.ok) {

            const session = await response.json();
            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({ sessionId: session.id });
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

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NVqQtKRXD3JBQTy6JIY4sIGD0JjJN5B3XuwwjUgixkigGpr97sUWtQzYtqz2MxT98PE5iEUcrTs1smFQ7ecb71m000jBmKkLL');

const CheckoutButton = () => {
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const response = await fetch('/api/create-checkout-session', { method: 'POST' });
        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <button onClick={handleCheckout}>Payer maintenant</button>
    );
};

export default CheckoutButton;




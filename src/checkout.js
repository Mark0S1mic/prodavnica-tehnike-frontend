import { loadStripe } from '@stripe/stripe-js';

export const checkout = async (pubKey, sessionId) => {
    const stripe = await loadStripe(pubKey);
    await stripe.redirectToCheckout({ sessionId });
};
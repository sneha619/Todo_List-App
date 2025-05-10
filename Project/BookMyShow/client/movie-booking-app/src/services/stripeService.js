const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeService {
    async createPaymentIntent(amount, currency = 'usd') {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
            });
            return paymentIntent;
        } catch (error) {
            throw new Error('Error creating payment intent: ' + error.message);
        }
    }

    async confirmPayment(paymentIntentId) {
        try {
            const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
            return paymentIntent;
        } catch (error) {
            throw new Error('Error confirming payment: ' + error.message);
        }
    }
}

module.exports = new StripeService();
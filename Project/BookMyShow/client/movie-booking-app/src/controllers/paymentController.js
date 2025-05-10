class PaymentController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }

    async createPaymentIntent(req, res) {
        const { amount, currency } = req.body;

        try {
            const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async confirmPayment(req, res) {
        const { paymentIntentId } = req.body;

        try {
            const paymentConfirmation = await this.stripeService.confirmPayment(paymentIntentId);
            res.status(200).json(paymentConfirmation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default PaymentController;
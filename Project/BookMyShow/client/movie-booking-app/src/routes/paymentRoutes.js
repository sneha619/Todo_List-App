const express = require('express');
const PaymentController = require('../controllers/paymentController');

const router = express.Router();
const paymentController = new PaymentController();

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/confirm-payment', paymentController.confirmPayment);

module.exports = router;
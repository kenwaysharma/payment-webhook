var express = require('express');
const { default: validate } = require('../middleware/validate');
const Payment = require('../models/payment');
const moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// Webhook for the payment status
router.post('/webhook/payment', async (req, res, next) => {
  const {event, payload, created_at, id} = req.body;
  console.log('Payment event received:', event, payload, created_at, id);
  const doesPaymentExist = await Payment.findOne({ 'event_id': id });
  if (doesPaymentExist) {
    console.log('Payment already exists:', doesPaymentExist);
    return res.status(200).json({status: 'success', message: 'Payment event already exists', event: event});
  }
  const transactionDetail = await Payment.create({
    event_name: event,
    payment_status: payload.payment.entity.status,
    payment_amount: payload.payment.entity.amount,
    payment_id: payload.payment.entity.id,
    payment_currency: payload.payment.entity.currency,
    event_created_at: created_at,
    event_id: id,
    payload_raw: payload
  }).catch(err => {
    /* console.error('Error saving payment event:', err); */
    return res.status(500).json({status: 'error', message: 'Failed to save payment event', error: err.message});
  });

  console.log('Payment event saved successfully:', transactionDetail);


  res.json({status: 'success', message: 'Payment event received successfully', event: event}).status(200);
});

// Get all payment events for a particular payment ID
router.get('/payments/:id/events', async (req, res, next) => {
  try {
    const { id } = req.params;
        console.log('Fetching payment events for ID:', id);

    if(!id) {
      return res.status(400).json({ status: 'error', message: 'Payment ID is required' });
    }
    const paymentEvents = await Payment.find({ 'payment_id': id }).sort({ createdAt: 1 }).select('payment_id event_name event_created_at');
    const events = paymentEvents.map(event => ({
      event_type: event.event_name,
      received_at: moment.unix(event.event_created_at).format("DD-MM-YYYY HH:mm:ss"),
    }));
    res.json({ status: 'success', data: events });
  } catch (error) {
    console.error('Error fetching payment events:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch payment events', error: error.message });
  }
});

module.exports = router;

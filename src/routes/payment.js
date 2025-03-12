const express = require('express');
const router = express.Router();
const { addPaymentHistoryRecord, getRentersPaymentHistory, getSpecificRenterPaymentHistory } = require('../controllers/paymentController');

router.post('/add', addPaymentHistoryRecord); //works
router.get('/history', getRentersPaymentHistory); //works
router.get('/history/:renter_id', getSpecificRenterPaymentHistory); //works

module.exports = router;

const express = require('express');
const router = express.Router();
const { addPaymentHistoryRecord, getRentersPaymentHistory, getSpecificRenterPaymentHistory } = require('../controllers/paymentController');

router.post('/add', addPaymentHistoryRecord); //not working
router.get('/history', getRentersPaymentHistory); //not working
router.get('/history/:renter_id', getSpecificRenterPaymentHistory); //not working

module.exports = router;

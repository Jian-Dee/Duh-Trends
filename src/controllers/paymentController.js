const PaymentModel = require('../models/paymentModel');

// Controller to add a payment history record
const addPaymentHistoryRecord = async (req, res) => {
  try {
    const { payment_date, amount, remarks, renter_id } = req.body;

    if (!payment_date || !amount || !remarks || !renter_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await PaymentModel.addPaymentHistoryRecord(payment_date, amount, remarks, renter_id);
    res.json({ message: 'Payment history record added successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all renters' payment history
const getRentersPaymentHistory = async (req, res) => {
  try {
    const result = await PaymentModel.getRentersPaymentHistory();
    res.json({ message: 'Renter payment history retrieved successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get payment history for a specific renter
const getSpecificRenterPaymentHistory = async (req, res) => {
  try {
    const { renter_id } = req.params;
    
    if (!renter_id) {
      return res.status(400).json({ error: 'Renter ID is required' });
    }

    const result = await PaymentModel.getSpecificRenterPaymentHistory(renter_id);
    res.json({ message: 'Specific renter payment history retrieved successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addPaymentHistoryRecord, getRentersPaymentHistory, getSpecificRenterPaymentHistory };

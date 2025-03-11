const db = require('../config/db');

// Call stored procedure to add a payment history record
const addPaymentHistoryRecord = async (paymentDate, amount, remarks, renterId) => {
  try {
    const query = `CALL AddPaymentHistoryRecord(?, ?, ?, ?)`;
    const [result] = await db.execute(query, [paymentDate, amount, remarks, renterId]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to get all renters' payment history
const getRentersPaymentHistory = async () => {
  try {
    const query = `CALL GetRentersPaymentHistory()`;
    const [result] = await db.execute(query);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to get payment history for a specific renter
const getSpecificRenterPaymentHistory = async (renterId) => {
  try {
    const query = `CALL GetSpecificRenterPaymentHistory(?)`;
    const [result] = await db.execute(query, [renterId]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { addPaymentHistoryRecord, getRentersPaymentHistory, getSpecificRenterPaymentHistory };

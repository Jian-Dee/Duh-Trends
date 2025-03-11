const db = require('../config/db');

const addNewSale = async (staffId, itemId, quantity) => { // Remove renterId
  try {
      const query = `CALL AddNewSale(?, ?, ?)`; // Procedure now takes 3 parameters
      const [result] = await db.execute(query, [staffId, itemId, quantity]); // Remove renterId from execution
      return result;
  } catch (error) {
      throw error;
  }
};
const returnSoldItemsByRenter = async (renterId) => {
    try {
      const query = `CALL ReturningsolditemsByRenter(?)`;
      const [result] = await db.execute(query, [renterId]);
      return result;
    } catch (error) {
      throw error;
    }
};

const getRenterSalesHistoryWithSubtotal = async (renterId) => {
    try {
      const query = `CALL GetRenterSalesHistoryWithSubtotal(?)`;
      const [result] = await db.execute(query, [renterId]);
      return result;
    } catch (error) {
      throw error;
    }
};

// New method to get total sales by renter
const getTotalSalesByRenter = async (renterId) => { //func
    try {
        const query = `SELECT GetTotalSalesByRenter(?) AS total_sales`;
        const [result] = await db.execute(query, [renterId]);
        return result[0].total_sales;
    } catch (error) {
        throw error;
    }
};

const resetSales = async () => {
    try {
      const query = `CALL ResetSales()`;
      const [result] = await db.execute(query);
      return result;
    } catch (error) {
      throw error;
    }
};

module.exports = { 
  addNewSale, 
  returnSoldItemsByRenter, 
  getRenterSalesHistoryWithSubtotal, 
  getTotalSalesByRenter, 
  resetSales 
};

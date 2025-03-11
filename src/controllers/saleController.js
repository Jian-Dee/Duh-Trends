const saleModel = require('../models/saleModel');

const addNewSale = async (req, res) => {
  try {
      const { staffId, itemId, quantity } = req.body; // Remove renterId
      await saleModel.addNewSale(staffId, itemId, quantity); // Remove renterId from function call
      res.json({ message: 'Sale added successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const returnSoldItemsByRenter = async (req, res) => {
    try {
      const { renterId } = req.params;
      const result = await saleModel.returnSoldItemsByRenter(renterId);
      res.json({ message:"Sold Items retrieved successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getRenterSalesHistoryWithSubtotal = async (req, res) => {
    try {
      const { renterId } = req.params;
      const result = await saleModel.getRenterSalesHistoryWithSubtotal(renterId);
      res.json({ message:"Sales History retrieved successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getTotalSalesByRenter = async (req, res) => { //func
    try {
      const { renterId } = req.params;
      const totalSales = await saleModel.getTotalSalesByRenter(renterId);
      res.json({ total_sales: totalSales });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const resetSales = async (req, res) => {
    try {
      await saleModel.resetSales();
      res.json({ message: 'Sales have been reset successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = { 
  addNewSale, 
  returnSoldItemsByRenter, 
  getRenterSalesHistoryWithSubtotal, 
  getTotalSalesByRenter, 
  resetSales 
};

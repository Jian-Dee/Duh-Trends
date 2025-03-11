const stockModel = require('../models/stockModel');

// Controller to add a stockout item
const addStockoutItem = async (req, res) => {
    try {
        const { staffId, itemId, quantity, reason } = req.body;
        await stockModel.addStockoutItem(staffId, itemId, quantity, reason);
        res.json({ message: 'Stockout item added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get stockout items
const getStockoutItems = async (req, res) => {
    try {
        const stockoutItems = await stockModel.getStockoutItems();
        res.json(stockoutItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get renter stockout items
const getRenterStockoutItems = async (req, res) => {
    try {
        const { renterId } = req.params;
        const renterStockoutItems = await stockModel.getRenterStockoutItems(renterId);
        res.json(renterStockoutItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    addStockoutItem, 
    getStockoutItems, 
    getRenterStockoutItems
};

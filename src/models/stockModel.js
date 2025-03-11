const db = require('../config/db');

// Method to add a stockout item
const addStockoutItem = async (staffId, itemId, quantity, reason) => {
    try {
        const query = `CALL AddStockoutItem(?, ?, ?, ?)`;
        const [result] = await db.execute(query, [staffId, itemId, quantity, reason]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Method to get stockout items
const getStockoutItems = async () => {
    try {
        const query = `CALL GetStockoutItems()`;
        const [result] = await db.execute(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Method to get renter stockout items
const getRenterStockoutItems = async (renterId) => {
    try {
        const query = `CALL GetRenterStockoutItems(?)`;
        const [result] = await db.execute(query, [renterId]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    addStockoutItem, 
    getStockoutItems, 
    getRenterStockoutItems
};

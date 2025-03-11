const db = require('../config/db');

// Call stored procedure to add an item
const addItem = async (renterId, itemId, itemName, itemType) => {
  try {
    const query = `CALL AddItem(?, ?, ?, ?)`;
    const [result] = await db.execute(query, [renterId, itemId, itemName, itemType]);
    return result;
  } catch (error) {
    throw error;
  }
};

const editItem = async (renterId, itemId, newItemId, newItemName) => {
    try {
      const query = `CALL EditItem(?, ?, ?, ?)`;
      const [result] = await db.execute(query, [renterId, itemId, newItemId, newItemName]);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  const deleteItem = async (renterId, itemId) => {
    try {
      const query = `CALL DeleteItem(?, ?)`;
      const [result] = await db.execute(query, [renterId, itemId]);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  const addItemToStock = async (renterId, itemId, quantity, itemPrice, itemDescription) => {
    try {
      const query = `CALL AddItemToStock(?, ?, ?, ?, ?)`;
      const [result] = await db.execute(query, [renterId, itemId, quantity, itemPrice, itemDescription]);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  const editItemQuantity = async (renterId, itemId, newQuantity, newPrice, newDescription) => {
    try {
      const query = `CALL EditItemQuantity(?, ?, ?, ?, ?)`;
      const [result] = await db.execute(query, [renterId, itemId, newQuantity, newPrice, newDescription]);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  const deleteItemFromStock = async (renterId, itemId) => {
    try {
      const query = `CALL DeleteItemFromStock(?, ?)`;
      const [result] = await db.execute(query, [renterId, itemId]);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  const returnRenterStock = async (renterId) => {
    try {
      const query = `CALL ReturnRenterStock(?)`;
      const [result] = await db.execute(query, [renterId]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const getTotalItemsInStockByRenter = async (renterId) => {
    try {
      const query = `SELECT totaliteminstockbyrenter(?) AS total_items;`;
      const [result] = await db.execute(query, [renterId]);
      return result[0]; // Return the first row
    } catch (error) {
      throw error;
    }
  };

  const getTotalLowStockByRenter = async (renterId) => {
    try {
      const query = `SELECT totallowstockbyrenter(?) AS total_low_stock`;
      const [result] = await db.execute(query, [renterId]);
      return result[0]; 
    } catch (error) {
      throw error;
    }
  };

  const getTotalOutOfStockItems = async (renterId) => {
    try {
      const query = `SELECT totaloutofstockitems(?) AS total_out_of_stock`;
      const [result] = await db.execute(query, [renterId]);
      return result[0].total_out_of_stock;
    } catch (error) {
      throw error;
    }
  };  
  
  module.exports = { 
    addItem, 
    editItem, 
    deleteItem, 
    addItemToStock, 
    editItemQuantity, 
    deleteItemFromStock, 
    returnRenterStock, 
    getTotalItemsInStockByRenter,
    getTotalLowStockByRenter,  
    getTotalOutOfStockItems
  };
  
  
  
  
  
  
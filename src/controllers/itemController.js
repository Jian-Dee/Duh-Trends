const ItemModel = require('../models/itemModel');

// Controller to add an item
const addItem = async (req, res) => { 
  try {
    const { renterId, itemId, itemName, itemType } = req.body;
    await ItemModel.addItem(renterId, itemId, itemName, itemType);
    res.json({ message: 'Item added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editItem = async (req, res) => {
    try {
      const { renterId, itemId, newItemId, newItemName } = req.body;
      await ItemModel.editItem(renterId, itemId, newItemId, newItemName);
      res.json({ message: 'Item edited successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteItem = async (req, res) => {
    try {
      const { renterId, itemId } = req.body;
      await ItemModel.deleteItem(renterId, itemId);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const addItemToStock = async (req, res) => {
    try {
        console.log(req.body); // Add this to debug
        const { itemId, newQuantity } = req.body;
        if (!itemId || !newQuantity) {
            return res.status(400).json({ error: "itemId and newQuantity are required" });
        }
        await ItemModel.addItemToStock(itemId, newQuantity);
        res.json({ message: 'Item quantity updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


  const editItemQuantity = async (req, res) => {
    try {
      const { renterId, itemId, newQuantity, newPrice, newDescription } = req.body;
      await ItemModel.editItemQuantity(renterId, itemId, newQuantity, newPrice, newDescription);
      res.json({ message: 'Item quantity updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteItemFromStock = async (req, res) => {
    try {
      const { renterId, itemId } = req.body;
      await ItemModel.deleteItemFromStock(renterId, itemId);
      res.json({ message: 'Item deleted from stock successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const returnRenterStock = async (req, res) => {
    try {
      const { renterId } = req.params;
      const stock = await ItemModel.returnRenterStock(renterId);
      res.json( {stock} );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getTotalItemsInStockByRenter = async (req, res) => {
    try {
      const { renterId } = req.params;
  
      if (!renterId) {
        return res.status(400).json({ error: 'Renter ID is required' });
      }
  
      const result = await ItemModel.getTotalItemsInStockByRenter(renterId);
      res.json({ total_items: result.total_items });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getTotalLowStockByRenter = async (req, res) => {
    try {
      const { renterId } = req.params;
  
      if (!renterId) {
        return res.status(400).json({ error: 'Renter ID is required' });
      }
  
      const result = await ItemModel.getTotalLowStockByRenter(renterId);
      res.json({ total_low_stock: result.total_low_stock });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };  

  const getTotalOutOfStockItems = async (req, res) => {
    try {
      const { renterId } = req.params;
      if (!renterId) {
        return res.status(400).json({ error: 'Renter ID is required' });
      }
  
      const total = await ItemModel.getTotalOutOfStockItems(renterId);
      res.json({ renterId, totalOutOfStockItems: total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getAllItems = async (req, res) => {
    try {
        const { renterId } = req.params;

        if (!renterId) {
            return res.status(400).json({ error: 'Renter ID is required' });
        }

        const items = await ItemModel.getAllItems(renterId);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    getTotalOutOfStockItems,
    getAllItems 
};

  
  
  
  
  
  

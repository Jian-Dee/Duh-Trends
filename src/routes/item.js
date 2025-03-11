const express = require('express');
const router = express.Router();
const { 
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
} = require('../controllers/itemController');

router.post('/add', addItem); //works
router.put('/edit', editItem); //works
router.delete('/delete', deleteItem); //works
router.post('/add-to-stock', addItemToStock); //works
router.put('/edit-quantity', editItemQuantity); //works
router.delete('/delete-from-stock', deleteItemFromStock); //works
router.get('/return-stock/:renterId', returnRenterStock); //works
router.get('/total-stock/:renterId', getTotalItemsInStockByRenter); //works
router.get('/low-stock/:renterId', getTotalLowStockByRenter); //works
router.get('/out-of-stock/:renterId', getTotalOutOfStockItems); //works

module.exports = router;

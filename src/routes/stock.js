const express = require('express');
const router = express.Router();
const { addStockoutItem, getStockoutItems, getRenterStockoutItems } = require('../controllers/stockController');


// Route for adding a stockout item
router.post('/add', addStockoutItem); //works

// Route for getting all stockout items
router.get('/stockout-items', getStockoutItems); //works

// Route for getting renter stockout items
router.get('/renter-stockout-items/:renterId', getRenterStockoutItems); //works

module.exports = router;

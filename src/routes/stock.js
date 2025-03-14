const express = require('express');
const router = express.Router();
const { addStockoutItem, getStockoutItems, getRenterStockoutItems } = require('../controllers/stockController');

router.post('/add', addStockoutItem); //works
router.get('/stockout-items', getStockoutItems); //works
router.get('/renter-stockout-items/:renterId', getRenterStockoutItems); //works

module.exports = router;

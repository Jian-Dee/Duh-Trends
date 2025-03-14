const express = require('express');
const router = express.Router();
const { 
  addNewSale, 
  returnSoldItemsByRenter, 
  getRenterSalesHistoryWithSubtotal, 
  getTotalSalesByRenter, 
  resetSales 
} = require('../controllers/saleController');

router.post('/add', addNewSale);  //works 
router.get('/return-items/:renterId', returnSoldItemsByRenter); //works
router.get('/sales-history/:renterId', getRenterSalesHistoryWithSubtotal); //works 
router.get('/total-sales/:renterId', getTotalSalesByRenter); //works
router.post('/reset', resetSales);  //have not tried

module.exports = router;

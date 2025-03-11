const express = require('express');
const router = express.Router();
const { addRentRecord, editRentRecord, getAllRentRecords, getTotalRenters } = require('../controllers/rentController');

router.post('/add', addRentRecord); //works
router.put('/edit', editRentRecord); //works
router.get('/all', getAllRentRecords); //works
router.get('/total-renters', getTotalRenters); //works

module.exports = router;

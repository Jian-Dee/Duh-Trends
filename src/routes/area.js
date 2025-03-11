const express = require('express');
const router = express.Router();
const { addArea, editArea, viewAreaWithTypeDetails } = require('../controllers/areaController');

router.post('/add', addArea); //works
router.put('/edit', editArea); //works somewhat
router.get('/view', viewAreaWithTypeDetails); //works

module.exports = router;

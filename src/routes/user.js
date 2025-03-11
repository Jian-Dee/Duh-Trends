const express = require('express');
const router = express.Router();
const { getAllUsers, addNewUser, editUser, deleteUser } = require('../controllers/userController');

router.get('/all', getAllUsers); //works
router.post('/add', addNewUser); //works
router.put('/edit', editUser); // not working
router.delete('/delete', deleteUser); //works

module.exports = router;

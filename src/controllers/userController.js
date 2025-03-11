const UserModel = require('../models/userModel');

// Controller to add a new user
const addNewUser = async (req, res) => {
  try {
    const { name, username, password, role_name, gender_title, contact_number } = req.body;

    if (!name || !username || !password || !role_name || !gender_title || !contact_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await UserModel.addNewUser(name, username, password, role_name, gender_title, contact_number);
    res.json({ message: 'User added successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to edit an existing user
const editUser = async (req, res) => {
  try {
    const { user_id, name, username, password, role_name, gender_title, contact_number } = req.body;

    if (!user_id || !name || !username || !password || !role_name || !gender_title || !contact_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await UserModel.editUser(user_id, name, username, password, role_name, gender_title, contact_number);
    res.json({ message: 'User updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const result = await UserModel.deleteUser(user_id);
    res.json({ message: 'User deleted successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all users
const getAllUsers = async (req, res) => {
    try {
      const result = await UserModel.getAllUsers();
      res.json({ message: 'Users retrieved successfully', data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { getAllUsers, addNewUser, editUser, deleteUser };

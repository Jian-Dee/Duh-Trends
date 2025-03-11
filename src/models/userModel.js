const db = require('../config/db');

// Call stored procedure to add a new user
const addNewUser = async (name, username, password, role_name, gender_title, contact_number) => {
  try {
    const query = `CALL AddNewUser(?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [name, username, password, role_name, gender_title, contact_number]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to edit an existing user
const editUser = async (user_id, name, username, password, role_name, gender_title, contact_number) => {
  try {
    const query = `CALL EditUser(?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [user_id, name, username, password, role_name, gender_title, contact_number]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to delete a user
const deleteUser = async (user_id) => {
  try {
    const query = `CALL DeleteUser(?)`;
    const [result] = await db.execute(query, [user_id]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to fetch all users
const getAllUsers = async () => {
    try {
      const query = `CALL GetAllUsers()`;
      const [result] = await db.execute(query);
      return result[0];
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = { addNewUser, editUser, deleteUser, getAllUsers };

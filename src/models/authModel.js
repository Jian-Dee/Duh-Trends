const db = require('../config/db');

const findUserByUsername = async (username) => {
  try {
    const query = `SELECT * FROM tbl_user WHERE username = ?`;
    const [result] = await db.execute(query, [username]);
    return result.length ? result[0] : null;
  } catch (error) {
    throw error;
  }
};

const getRenterIdByUsername = async (username) => {
  try {
    const query = `
      SELECT r.renter_id 
      FROM tbl_renter r
      JOIN tbl_user u ON r.renter_username = u.username
      WHERE u.username = ?
    `;
    const [result] = await db.execute(query, [username]);
    return result.length ? result[0].renter_id : null;
  } catch (error) {
    throw error;
  }
};

const getUserIdByUsername = async (username) => {
  try {
    const query = `SELECT user_id FROM tbl_user WHERE username = ?`;
    const [result] = await db.execute(query, [username]);
    return result.length ? result[0].user_id : null;
  } catch (error) {
    throw error;
  }
};

module.exports = { findUserByUsername, getRenterIdByUsername, getUserIdByUsername };

const db = require('../config/db');

// Call stored procedure to add a rent record
const addRentRecord = async (renterId, areaId, rentStarted, rentEnded) => {
  try {
    const query = `CALL AddRentRecord(?, ?, ?, ?)`;
    const [result] = await db.execute(query, [renterId, areaId, rentStarted, rentEnded]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to edit a rent record
const editRentRecord = async (rentId, renterId, areaId, rentStarted, rentEnded) => {
  try {
    const query = `CALL EditRentRecord(?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [rentId, renterId, areaId, rentStarted, rentEnded]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to get all rent records
const getAllRentRecords = async () => {
  try {
    const query = `CALL GetAllRentRecords()`;
    const [result] = await db.execute(query);
    return result;
  } catch (error) {
    throw error;
  }
};

const getTotalRenters = async () => {
  try {
    const query = `SELECT TotalRenters() AS total_renters`;
    const [result] = await db.execute(query);
    return result[0].total_renters;
  } catch (error) {
    throw error;
  }
};


module.exports = { addRentRecord, editRentRecord, getAllRentRecords, getTotalRenters };

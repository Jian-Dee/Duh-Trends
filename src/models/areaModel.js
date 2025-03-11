const db = require('../config/db');

// Call stored procedure to add a new area
const addArea = async (areaName, typeName, size, price, description) => {
  try {
    const query = `CALL AddArea(?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [areaName, typeName, size, price, description]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to edit an existing area
const editArea = async (areaId, areaName, typeName, size, price, description) => {
  try {
    const query = `CALL EditArea(?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [areaId, areaName, typeName, size, price, description]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Call stored procedure to get area details with type info
const viewAreaWithTypeDetails = async () => {
  try {
    const query = `CALL ViewAreaWithTypeDetails()`;
    const [result] = await db.execute(query);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { addArea, editArea, viewAreaWithTypeDetails };

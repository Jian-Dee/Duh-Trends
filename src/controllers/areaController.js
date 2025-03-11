const AreaModel = require('../models/areaModel');

// Controller to add a new area
const addArea = async (req, res) => {
  try {
    const { area_name, type_name, size, price, description } = req.body;
    
    if (!area_name || !type_name || !size || !price || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await AreaModel.addArea(area_name, type_name, size, price, description);
    res.json({ message: 'Area added successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to edit an existing area
const editArea = async (req, res) => {
  try {
    const { area_id, area_name, type_name, size, price, description } = req.body;

    if (!area_id || !area_name || !type_name || !size || !price || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await AreaModel.editArea(area_id, area_name, type_name, size, price, description);
    res.json({ message: 'Area updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to view all areas with type details
const viewAreaWithTypeDetails = async (req, res) => {
  try {
    const result = await AreaModel.viewAreaWithTypeDetails();
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addArea, editArea, viewAreaWithTypeDetails };

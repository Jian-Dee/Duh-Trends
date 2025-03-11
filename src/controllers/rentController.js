const RentModel = require('../models/rentModel');

// Controller to add a rent record
const addRentRecord = async (req, res) => {
  try {
    const { renter_id, area_id, rent_started, rent_ended } = req.body;

    if (!renter_id || !area_id || !rent_started || !rent_ended) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await RentModel.addRentRecord(renter_id, area_id, rent_started, rent_ended);
    res.json({ message: 'Rent record added successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to edit a rent record
const editRentRecord = async (req, res) => {
  try {
    const { rent_id, renter_id, area_id, rent_started, rent_ended } = req.body;

    if (!rent_id || !renter_id || !area_id || !rent_started || !rent_ended) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await RentModel.editRentRecord(rent_id, renter_id, area_id, rent_started, rent_ended);
    res.json({ message: 'Rent record updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all rent records
const getAllRentRecords = async (req, res) => {
  try {
    const result = await RentModel.getAllRentRecords();
    res.json({ message: 'All rent records retrieved successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalRenters = async (req, res) => {
  try {
    const total = await RentModel.getTotalRenters();
    res.json({ totalRenters: total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addRentRecord, editRentRecord, getAllRentRecords, getTotalRenters };

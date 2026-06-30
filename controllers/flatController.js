const flatService = require("../services/flatService");

const addFlat = async (req, res) => {
  try {
    const flat = await flatService.createFlat(req.body);

    res.status(201).json({
      success: true,
      message: "Flat added successfully.",
      data: flat,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getFlats = async (req, res) => {
  try {
    const flats = await flatService.getAllFlats();

    res.status(200).json({
      success: true,
      count: flats.length,
      data: flats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFlat = async (req, res) => {
  try {
    const flat = await flatService.updateFlat(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Flat updated successfully.",
      data: flat,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFlat = async (req, res) => {
  try {
    await flatService.deleteFlat(req.params.id);

    res.status(200).json({
      success: true,
      message: "Flat deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addFlat,
  getFlats,
  updateFlat,
  deleteFlat,
};
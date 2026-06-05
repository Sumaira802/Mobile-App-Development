const SavedCity = require("../models/SavedCity");

// CREATE
exports.addCity = async (req, res) => {
  try {
    const { city } = req.body;

    const newCity = await SavedCity.create({
      city,
      userId: req.user.id,
    });

    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// READ
exports.getCities = async (req, res) => {
  try {
    const cities = await SavedCity.find({
      userId: req.user.id,
    });

    res.json(cities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
exports.updateCity = async (req, res) => {
  try {
    const city = await SavedCity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(city);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
exports.deleteCity = async (req, res) => {
  try {
    await SavedCity.findByIdAndDelete(req.params.id);

    res.json({
      message: "City Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
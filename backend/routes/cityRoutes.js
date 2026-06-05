const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  addCity,
  getCities,
  updateCity,
  deleteCity,
} = require("../controllers/cityController");

router.post(
  "/",
  authMiddleware,
  addCity
);

router.get(
  "/",
  authMiddleware,
  getCities
);

router.put(
  "/:id",
  authMiddleware,
  updateCity
);

router.delete(
  "/:id",
  authMiddleware,
  deleteCity
);

module.exports = router;
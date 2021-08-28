import express from "express";
import districtController from "../../controllers/district";

const router = express.Router();

router.get("/", districtController.findDistricts);
router.get("/:district_code", districtController.findDistrictByCode);

module.exports = router;

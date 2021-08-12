import express from "express";
import districtController from "../../controllers/district";

const router = express.Router();

router.get("/", districtController.findByParentCode);
router.get("/:district_code(\\d+)", districtController.findByDistrictCode);
router.get("/:district_name", districtController.findByDistrictName);

module.exports = router;

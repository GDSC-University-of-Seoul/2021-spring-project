import express from "express";
import centerController from "../../controllers/childCareCenter";

const router = express.Router();

router.get("/", centerController.findByDistrictCode);
router.get("/:center_id", centerController.findByCenterId);

export default router;

import express from "express";
import anomalyLogController from "../../controllers/anomalyLog";

const router = express.Router();

router.get("/", anomalyLogController.findAnomalyLogs);
router.post("/", anomalyLogController.createAnomalyLog);

export default router;

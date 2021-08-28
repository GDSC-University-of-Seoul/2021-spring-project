import express from "express";
import anomalyLogController from "../../controllers/anomalyLog";

const router = express.Router();

router.get("/", anomalyLogController.findAllLogs);
router.get("/recent", anomalyLogController.findRecentLogs);
router.post("/", anomalyLogController.createAnomalyLog);

export default router;

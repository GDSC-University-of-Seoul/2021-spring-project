import express from "express";
import districtRouter from "./district";
import centerRouter from "./childCareCenter";
import cctvRouter from "./cctv";
import anomalyRouter from "./anomaly";
import logRouter from "./log";

const router = new express.Router();

router.use("/districts", districtRouter);
router.use("/centers", centerRouter);
router.use("/cctvs", cctvRouter);
router.use("/anomalies", anomalyRouter);
router.use("/anomalies/logs", logRouter);

module.exports = router;

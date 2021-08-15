import express from "express";
import districtRouter from "./district";
import centerRouter from "./childCareCenter";
import cctvRouter from "./cctv";
import logRouter from "./anomalyLog";

const router = new express.Router();

router.use("/districts", districtRouter);
router.use("/centers", centerRouter);
router.use("/cctvs", cctvRouter);
router.use("/anomalies/logs", logRouter);

module.exports = router;

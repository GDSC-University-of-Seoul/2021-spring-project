import express from "express";
import districtRouter from "./district";
import centerRouter from "./childCareCenter";
import cctvRouter from "./cctv";
import anomalyRouter from "./anomaly";
import logRouter from "./log";
import authRouter from "./auth";
import { isLoggedIn } from "../../middlewares/login";

const router = new express.Router();

router.use("/districts", isLoggedIn, districtRouter);
router.use("/centers", isLoggedIn, centerRouter);
router.use("/cctvs", isLoggedIn, cctvRouter);
router.use("/anomalies", isLoggedIn, anomalyRouter);
router.use("/anomalies/logs", isLoggedIn, logRouter);
router.use("/auth", authRouter);

module.exports = router;

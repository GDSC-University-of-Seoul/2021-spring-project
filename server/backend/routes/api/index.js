import express from "express";
import districtRouter from "./district";
import centerRouter from "./childCareCenter";
import cctvRouter from "./cctv";
import logRouter from "./anomalyLog";
import authRouter from "./auth";

const router = new express.Router();

// TODO: add passport.authenticate("jwt") middleware if needed
router.use("/districts", districtRouter);
router.use("/centers", centerRouter);
router.use("/cctvs", cctvRouter);
router.use("/anomalies/logs", logRouter);
router.use("/auth", authRouter);

export default router;

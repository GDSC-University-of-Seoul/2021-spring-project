import express from "express";
import { sequelize, Sequelize } from "../database/models";
import Video from "../database/models/video";
import Anomaly from "../database/models/anomaly";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { video_id } = req.query;
    let filters = {};
    if (video_id) {
      filters.video_id = video_id;
    }
    const anomalies = await Anomaly.findAll({
      include: {
        model: Video,
        attributes: [],
        where: filters,
      },
    });
    res.json(anomalies);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:ano_id", async (req, res, next) => {
  try {
    const anomaly = await Anomaly.findOne({
      where: { ano_id: req.params.ano_id },
    });
    res.json(anomaly);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

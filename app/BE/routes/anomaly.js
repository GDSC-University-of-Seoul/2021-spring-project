import express from "express";
import Video from "../database/models/video";
import Anomaly from "../database/models/anomaly";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
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
  })
  .post(async (req, res, next) => {
    const { video, ...anomaly } = req.body;
    try {
      const [video_obj, created] = await Video.findOrCreate({
        where: {
          record_date: video.record_date,
          cctv_id: video.cctv_id,
        },
        defaults: {
          storage_name: video.storage_name,
        },
      });
      const anomaly_obj = await Anomaly.create({
        video_id: video_obj.video_id,
        ...anomaly,
      });
      res.json(anomaly_obj);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get("/:anomaly_id", async (req, res, next) => {
  try {
    const anomaly = await Anomaly.findOne({
      where: { anomaly_id: req.params.anomaly_id },
    });
    res.json(anomaly);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

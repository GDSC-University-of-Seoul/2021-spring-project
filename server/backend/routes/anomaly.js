import {
  Anomaly,
  AnomalyLog,
  CCTV,
  ChildCareCenter,
  Sequelize,
  Video,
} from "../../database/models/transform";

import express from "express";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { video, ...anomaly } = req.body;
    const cctv_obj = await CCTV.findOne({
      where: {
        cctv_mac: video.cctv_mac,
      },
    });
    const [video_obj, created] = await Video.findOrCreate({
      where: {
        record_date: video.record_date,
        cctv_id: cctv_obj.dataValues.cctv_id,
      },
      defaults: {
        storage_name: video.storage_name,
      },
      include: {
        model: CCTV,
        attributes: ["cctv_mac"],
        include: {
          model: ChildCareCenter,
          attributes: ["center_id", "center_name", "address"],
        },
      },
      attributes: [
        "video_id",
        "record_date",
        [Sequelize.col("CCTV.ChildCareCenter.center_id"), "center_id"],
        [Sequelize.col("CCTV.ChildCareCenter.center_name"), "center_name"],
        [Sequelize.col("CCTV.ChildCareCenter.address"), "address"],
      ],
    });
    const anomaly_obj = await Anomaly.create({
      video_id: video_obj.video_id,
      ...anomaly,
    });
    if (created) {
      const center_obj = await ChildCareCenter.findOne({
        include: {
          model: CCTV,
          attributes: ["cctv_mac"],
          where: { cctv_mac: video.cctv_mac },
        },
      });
      await AnomalyLog.create({
        center_id: center_obj.center_id,
        center_name: center_obj.center_name,
        address: center_obj.address,
        record_date: video_obj.record_date,
        anomaly_type: anomaly_obj.anomaly_type,
        start_time: anomaly.start_time,
        end_time: anomaly.end_time,
      });
    } else {
      await AnomalyLog.create({
        center_id: video_obj.dataValues.center_id,
        center_name: video_obj.dataValues.center_name,
        address: video_obj.dataValues.address,
        record_date: video.record_date,
        anomaly_type: anomaly_obj.anomaly_type,
        start_time: anomaly.start_time,
        end_time: anomaly.end_time,
      });
    }
    res.status(201).json(anomaly_obj);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

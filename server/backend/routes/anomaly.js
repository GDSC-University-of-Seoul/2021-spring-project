import express from "express";
import {
  Sequelize,
  ChildCareCenter,
  CCTV,
  Video,
  Anomaly,
} from "../../database/models/transform";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { video, ...anomaly } = req.body;
    const [video_obj, created] = await Video.findOrCreate({
      where: {
        record_date: video.record_date,
        cctv_mac: video.cctv_mac,
      },
      defaults: {
        storage_name: video.storage_name,
      },
      include: {
        model: CCTV,
        attributes: [],
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
          attributes: [],
          include: {
            model: Video,
            attributes: [],
            where: { video_id: video_obj.video_id },
          },
        },
      });
      await AnomalyLog.create({
        center_id: center_obj.center_id,
        center_name: center_obj.center_name,
        address: center_obj.address,
        record_date: video_obj.record_date,
        anomaly_type: anomaly_obj.anomaly_type,
      });
    } else {
      await AnomalyLog.create({
        center_id: video_obj.dataValues.center_id,
        center_name: video_obj.dataValues.center_name,
        address: video_obj.dataValues.address,
        record_date: video_obj.record_date,
        anomaly_type: anomaly_obj.anomaly_type,
      });
    }
    res.status(201).json(anomaly_obj);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

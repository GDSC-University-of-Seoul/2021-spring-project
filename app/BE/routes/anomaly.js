import express from "express";
import {
  Sequelize,
  ChildCareCenter,
  CCTV,
  Video,
  Anomaly,
} from "../../DB/models/transform";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const { center_id, center_name } = req.query;
      let centerFilters = {};
      if (center_id) {
        centerFilters.center_id = center_id;
      }
      if (center_name) {
        centerFilters.center_name = center_name;
      }

      let startDate = new Date();
      const endDate = new Date();
      startDate.setDate(endDate.getDate() - 60);
      const videoFilters = {
        record_date: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      };

      const anomalies = await Anomaly.findAll({
        include: {
          model: Video,
          attributes: [],
          where: videoFilters,
          include: {
            model: CCTV,
            attributes: [],
            include: {
              model: ChildCareCenter,
              attributes: ["center_name", "address"],
              where: centerFilters,
            },
          },
        },
        attributes: [
          "start_time",
          "end_time",
          "follow_up",
          "anomaly_type",
          [
            Sequelize.col("Video.CCTV.ChildCareCenter.center_name"),
            "center_name",
          ],
          [Sequelize.col("Video.CCTV.ChildCareCenter.address"), "address"],
        ],
      });
      res.json(anomalies);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { video, ...anomaly } = req.body;
      const [video_obj, created] = await Video.findOrCreate({
        where: {
          record_date: video.record_date,
          cctv_id: video.cctv_id,
        },
        defaults: {
          storage_name: video.storage_name,
        },
        include: {
          model: CCTV,
          attributes: [],
          include: {
            model: ChildCareCenter,
            attributes: ["center_name", "address"],
          },
        },
        attributes: [
          "video_id",
          "record_date",
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
        const log_obj = await AnomalyLog.create({
          center_name: center_obj.center_name,
          address: center_obj.address,
          record_date: video_obj.record_date,
          anomaly_type: anomaly_obj.anomaly_type,
        });
      } else {
        const log_obj = await AnomalyLog.create({
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

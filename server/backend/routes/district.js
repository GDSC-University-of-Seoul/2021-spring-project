import express from "express";
import { sequelize } from "../../database/models/transform";
import upperDistricts from "../utils/upperDistrict";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { parent_code } = req.query;
    if (parent_code) {
      const districts = await sequelize.query(
        `SELECT d.*, COUNT(a.anomaly_log_id)
        FROM district as d
        LEFT OUTER JOIN child_care_center as c
        ON d.district_code = c.district_code
        LEFT OUTER JOIN anomaly_log as a
        ON c.center_id = a.center_id
        WHERE d.parent_code = '${parent_code}'
        GROUP BY d.district_code
        ORDER BY 1`,
        { type: sequelize.QueryTypes.SELECT }
      );
      res.json(districts);
    } else {
      const districts = await sequelize.query(
        `SELECT upper_d.*, COUNT(a.anomaly_log_id)
        FROM district as upper_d
        LEFT OUTER JOIN district as lower_d
        ON upper_d.district_code = lower_d.parent_code
        LEFT OUTER JOIN child_care_center as c
        ON lower_d.district_code = c.district_code
        LEFT OUTER JOIN anomaly_log as a
        ON c.center_id = a.center_id
        WHERE upper_d.parent_code IS NULL
        GROUP BY upper_d.district_code
        ORDER BY 1`,
        { type: sequelize.QueryTypes.SELECT }
      );
      res.json(districts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:district_code(\\d+)", async (req, res, next) => {
  try {
    if (parseInt(req.params.district_code.slice(2, 4)) === 0) {
      const districts = await sequelize.query(
        `SELECT upper_d.*, COUNT(a.anomaly_log_id)
        FROM district as upper_d
        LEFT OUTER JOIN district as lower_d
        ON upper_d.district_code = lower_d.parent_code
        LEFT OUTER JOIN child_care_center as c
        ON lower_d.district_code = c.district_code
        LEFT OUTER JOIN anomaly_log as a
        ON c.center_id = a.center_id
        WHERE upper_d.district_code = '${req.params.district_code}'
        GROUP BY upper_d.district_code
        ORDER BY 1`,
        { type: sequelize.QueryTypes.SELECT }
      );
      res.json(districts);
    } else {
      const districts = await sequelize.query(
        `SELECT d.*, COUNT(a.anomaly_log_id)
        FROM district as d
        LEFT OUTER JOIN child_care_center as c
        ON d.district_code = c.district_code
        LEFT OUTER JOIN anomaly_log as a
        ON c.center_id = a.center_id
        WHERE d.district_code = '${req.params.district_code}'
        GROUP BY d.district_code
        ORDER BY 1`,
        { type: sequelize.QueryTypes.SELECT }
      );
      res.json(districts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:district_name", async (req, res, next) => {
  try {
    if (upperDistricts.includes(req.params.district_name)) {
      const districts = await sequelize.query(
        `SELECT upper_d.*, COUNT(a.anomaly_log_id)
        FROM district as upper_d
        LEFT OUTER JOIN district as lower_d
        ON upper_d.district_code = lower_d.parent_code
        LEFT OUTER JOIN child_care_center as c
        ON lower_d.district_code = c.district_code
        LEFT OUTER JOIN anomaly_log as a
        ON c.center_id = a.center_id
        WHERE upper_d.district_name = '${req.params.district_name}'
        GROUP BY upper_d.district_code
        ORDER BY 1`,
        { type: sequelize.QueryTypes.SELECT }
      );
      res.json(districts);
    } else {
      const districts = await sequelize.query(
        `SELECT d.*, COUNT(a.anomaly_log_id)
        FROM district as d
        LEFT OUTER JOIN child_care_center as c
        ON d.district_code = c.district_code
        LEFT OUTER JOIN anomaly_log as a
        ON c.center_id = a.center_id
        WHERE d.district_name = '${req.params.district_name}'
        GROUP BY d.district_code
        ORDER BY 1`,
        { type: sequelize.QueryTypes.SELECT }
      );
      res.json(districts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

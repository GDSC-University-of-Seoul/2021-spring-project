import express from "express";
import { Sequelize, AnomalyLog } from "../../DB/models/transform";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { center_name } = req.query;
    let logFilters = {};
    if (center_name) {
      logFilters.center_name = center_name;
    }

    let startDate = new Date();
    const endDate = new Date();
    startDate.setDate(endDate.getDate() - 60);
    logFilters.record_date = {
      [Sequelize.Op.between]: [startDate, endDate],
    };

    const logs = await AnomalyLog.findAll({
      where: logFilters,
    });
    res.json(logs);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

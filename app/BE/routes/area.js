import express from "express";
import { sequelize, Sequelize } from "../database/models";
import Area from "../database/models/area";
import CdrCareCenter from "../database/models/cdrcare-center";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { center_id, center_name } = req.query;
    let filters = {};
    if (center_id) {
      filters.center_id = center_id;
    }
    if (center_name) {
      filters.name = center_name;
    }
    const areas = await Area.findAll({
      include: {
        model: CdrCareCenter,
        attributes: [],
        where: filters,
      },
    });
    res.json(areas);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:area_id", async (req, res, next) => {
  try {
    const area = await Area.findOne({
      where: { area_id: req.params.area_id },
    });
    res.json(area);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

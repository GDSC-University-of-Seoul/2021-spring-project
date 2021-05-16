import express from "express";
import { Sequelize, Op } from "sequelize";
import Region from "../database/models/region";
import CdrCareCenter from "../database/models/cdrcare-center";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { region } = req.query;
    const filters = {};
    if (region) {
      filters.region_name = {
        [Op.like]: `%${region}%`,
      };
    }
    const centers = await CdrCareCenter.findAll({
      include: [
        {
          model: Region,
          attributes: [],
        },
      ],
      attributes: [
        "center_id",
        "name",
        "lat",
        "lng",
        [Sequelize.col("Region.region_id"), "region_id"],
        [Sequelize.col("Region.region_name"), "region_name"],
      ],
    });
    res.json(centers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const center = await CdrCareCenter.findOne({
      where: {
        center_id: req.params.id,
      },
      attributes: [
        "center_id",
        "name",
        "lat",
        "lng",
        [Sequelize.col("Region.region_id"), "region_id"],
        [Sequelize.col("Region.region_name"), "region_name"],
      ],
    });
    res.json(center);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const center = await CdrCareCenter.findOne({
      where: {
        name: req.params.name,
      },
      attributes: [
        "center_id",
        "name",
        "lat",
        "lng",
        [Sequelize.col("Region.region_id"), "region_id"],
        [Sequelize.col("Region.region_name"), "region_name"],
      ],
    });
    res.json(center);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

import express from "express";
import Sequelize from "sequelize";
import Region from "../database/models/region";
import CdrCareCenter from "../database/models/cdrcare-center";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const regions = await Region.findAll({});
    res.json(regions);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const region = await Region.findOne({
      where: { region_id: req.params.id },
    });
    res.json(region);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id/center/", async (req, res, next) => {
  try {
    const center = await CdrCareCenter.findAll({
      include: [
        {
          model: Region,
          where: {
            region_id: req.params.id,
          },
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
      raw: true,
    });
    res.json(center);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id/center/:center_id", async (req, res, next) => {
  try {
    const center = await CdrCareCenter.findOne({
      include: [
        {
          model: Region,
          where: {
            region_id: req.params.id,
          },
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
      raw: true,
      where: {
        center_id: req.params.center_id,
      },
    });
    res.json(center);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

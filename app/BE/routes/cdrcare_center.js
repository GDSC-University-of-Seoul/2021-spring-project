import express from "express";
import { Sequelize, Op } from "sequelize";
import District from "../database/models/district";
import CdrCareCenter from "../database/models/cdrcare-center";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { code, name } = req.query;
    const filter = {};
    if (code) {
      filter.code = {
        [Op.like]: `%${code}%`,
      };
    }
    if (name) {
      filter.name = {
        [Op.like]: `%${name}%`,
      };
    }
    const centers = await CdrCareCenter.findAll({
      include: {
        model: District,
        attributes: [],
        where: filter,
      },
      attributes: [
        "center_id",
        "name",
        "lat",
        "lng",
        [Sequelize.col("District.code"), "district_code"],
        [Sequelize.col("District.name"), "district_name"],
      ],
    });
    res.json(centers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id(\\d+)", async (req, res, next) => {
  try {
    const center = await CdrCareCenter.findOne({
      include: {
        model: District,
        attributes: [],
      },
      where: {
        center_id: req.params.id,
      },
      attributes: [
        "center_id",
        "name",
        "lat",
        "lng",
        [Sequelize.col("District.code"), "district_code"],
        [Sequelize.col("District.name"), "district_name"],
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
      include: {
        model: District,
        attributes: [],
      },
      where: {
        name: req.params.name,
      },
      attributes: [
        "center_id",
        "name",
        "lat",
        "lng",
        [Sequelize.col("District.code"), "district_code"],
        [Sequelize.col("District.name"), "district_name"],
      ],
    });
    res.json(center);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

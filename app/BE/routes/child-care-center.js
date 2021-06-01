import express from "express";
import { Sequelize, Op } from "sequelize";
import District from "../database/models/district";
import ChildCareCenter from "../database/models/child-care-center";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { district_code, district_name } = req.query;
    const filter = {};
    if (district_code) {
      filter.district_code = {
        [Op.like]: `%${district_code}%`,
      };
    }
    if (district_name) {
      filter.district_name = {
        [Op.like]: `%${district_name}%`,
      };
    }
    const centers = await ChildCareCenter.findAll({
      include: {
        model: District,
        attributes: [],
        where: filter,
      },
      attributes: [
        "center_id",
        "center_name",
        "latitude",
        "longtitude",
        [Sequelize.col("District.district_code"), "district_code"],
        [Sequelize.col("District.district_name"), "district_name"],
      ],
    });
    res.json(centers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:center_id(\\d+)", async (req, res, next) => {
  try {
    const center = await ChildCareCenter.findOne({
      include: {
        model: District,
        attributes: [],
      },
      where: {
        center_id: req.params.center_id,
      },
      attributes: [
        "center_id",
        "center_name",
        "latitude",
        "longtitude",
        [Sequelize.col("District.district_code"), "district_code"],
        [Sequelize.col("District.district_name"), "district_name"],
      ],
    });
    res.json(center);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:center_name", async (req, res, next) => {
  try {
    const center = await ChildCareCenter.findOne({
      include: {
        model: District,
        attributes: [],
      },
      where: {
        name: req.params.center_name,
      },
      attributes: [
        "center_id",
        "center_name",
        "latitude",
        "longtitude",
        [Sequelize.col("District.district_code"), "district_code"],
        [Sequelize.col("District.district_name"), "district_name"],
      ],
    });
    res.json(center);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

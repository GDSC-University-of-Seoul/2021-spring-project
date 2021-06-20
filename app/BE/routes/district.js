import express from "express";
import { sequelize, Sequelize } from "../database/models";
import District from "../database/models/district";
import { districtJoin } from "../utils/join";
import upperDistricts from "../utils/upperDistrict";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { parent_code } = req.query;
    let filters = {};
    if (parent_code) {
      filters.parent_code = {
        [Sequelize.Op.like]: `%${parent_code}%`,
      };
      const districts = await District.findAll({
        where: filters,
        include: districtJoin,
        group: ["District.district_code"],
        attributes: [
          "district_code",
          "district_name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        order: ["district_code"],
      });
      res.json(districts);
    } else {
      filters.parent_code = null;
      const districts = await District.findAll({
        where: filters,
        include: {
          model: District,
          attributes: [],
          include: districtJoin,
        },
        group: ["District.district_code"],
        attributes: [
          "district_code",
          "district_name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        order: ["district_code"],
      });
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
      const district = await District.findOne({
        where: { district_code: req.params.district_code },
        include: {
          model: District,
          attributes: [],
          include: districtJoin,
        },
        group: ["District.district_code"],
        attributes: [
          "district_code",
          "district_name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
      });
      res.json(district);
    } else {
      const district = await District.findOne({
        where: { district_code: req.params.district_code },
        include: districtJoin,
        group: ["District.district_code"],
        attributes: [
          "district_code",
          "district_name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
      });
      res.json(district);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:district_name", async (req, res, next) => {
  try {
    if (upperDistricts.includes(req.params.district_name)) {
      const districts = await District.findAll({
        where: { district_name: req.params.district_name },
        include: {
          model: District,
          attributes: [],
          include: districtJoin,
        },
        group: ["District.district_code"],
        attributes: [
          "district_code",
          "district_name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        plain: true,
      });
      res.json(districts);
    } else {
      const districts = await District.findAll({
        where: { name: req.params.district_name },
        include: districtJoin,
        group: ["District.district_code"],
        attributes: [
          "district_code",
          "district_name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        plain: true,
      });
      res.json(districts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

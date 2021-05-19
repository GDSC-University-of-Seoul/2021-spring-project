import express from "express";
import { sequelize, Sequelize } from "../database/models";
import District from "../database/models/district";
import CdrCareCenter from "../database/models/cdrcare-center";
import Area from "../database/models/area";
import CCTV from "../database/models/cctv";
import Video from "../database/models/video";
import Anomaly from "../database/models/anomaly";

const router = express.Router();
const anomaly_join = {
  model: CdrCareCenter,
  attributes: [],
  include: {
    model: Area,
    attributes: [],
    include: {
      model: CCTV,
      attributes: [],
      include: {
        model: Video,
        attributes: [],
        include: {
          model: Anomaly,
          attributes: [],
        },
      },
    },
  },
};

router.get("/", async (req, res, next) => {
  try {
    const districts = await District.findAll({
      include: {
        model: District,
        attributes: [],
        include: anomaly_join,
      },
      where: {
        parent_code: null,
      },
      group: ["District.code"],
      attributes: [
        "code",
        "name",
        "parent_code",
        [sequelize.fn("COUNT", "anomaly_id"), "count"],
      ],
      order: ["code"],
    });
    res.json(districts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:code(\\d+)", async (req, res, next) => {
  try {
    const district = await District.findOne({
      where: { code: req.params.code },
    });
    if (district.dataValues.parent_code) {
      const district = await District.findOne({
        where: { code: req.params.code },
        include: {
          model: District,
          attributes: [],
          include: anomaly_join,
        },
        group: ["District.code"],
        attributes: [
          "code",
          "name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
      });
      res.json(district);
    } else {
      const districts = await District.findAll({
        where: { parent_code: district.dataValues.code },
        include: anomaly_join,
        group: ["District.code"],
        attributes: [
          "code",
          "name",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        order: ["code"],
      });
      res.json(districts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const district = await District.findOne({
      where: { name: req.params.name },
    });
    if (district.dataValues.parent_code) {
      const district = await District.findOne({
        where: { code: req.params.code },
        include: {
          model: District,
          attributes: [],
          include: anomaly_join,
        },
        group: ["District.code"],
        attributes: [
          "code",
          "name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
      });
      res.json(district);
    } else {
      const districts = await District.findAll({
        where: { parent_code: district.dataValues.code },
        include: anomaly_join,
        group: ["District.code"],
        attributes: [
          "code",
          "name",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        order: ["code"],
      });
      res.json(districts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

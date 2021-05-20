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
    const { parent_code } = req.query;
    if (!parent_code) {
      const districts = await District.findAll({
        where: {
          parent_code: null,
        },
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
        order: ["code"],
      });
      res.json(districts);
    } else {
      let filters = {};
      filters.parent_code = {
        [Sequelize.Op.like]: `%${parent_code}%`,
      };
      const districts = await District.findAll({
        where: filters,
        include: anomaly_join,
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
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:code(\\d+)", async (req, res, next) => {
  try {
    const { code } = req.params;
    if (parseInt(code.slice(2, 4)) === 0) {
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
      const district = await District.findOne({
        where: { code: req.params.code },
        include: anomaly_join,
        group: ["District.code"],
        attributes: [
          "code",
          "name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        logging: console.log,
      });
      res.json(district);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const obj = await District.findOne({
      where: { name: req.params.name },
    });
    if (!obj.dataValues.parent_code) {
      const district = await District.findOne({
        where: { code: obj.dataValues.code },
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
      const district = await District.findOne({
        where: { code: obj.dataValues.code },
        include: anomaly_join,
        group: ["District.code"],
        attributes: [
          "code",
          "name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        logging: console.log,
      });
      res.json(district);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

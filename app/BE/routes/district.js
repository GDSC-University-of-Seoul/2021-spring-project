import express from "express";
import { sequelize, Sequelize } from "../database/models";
import District from "../database/models/district";
import CdrCareCenter from "../database/models/cdrcare-center";
import Area from "../database/models/area";
import CCTV from "../database/models/cctv";
import Video from "../database/models/video";
import Anomaly from "../database/models/anomaly";

const router = express.Router();

const upper_districts = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라남도",
  "전라북도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

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
    let filters = {};
    if (parent_code) {
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
    } else {
      filters.parent_code = null;
      const districts = await District.findAll({
        where: filters,
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
    if (upper_districts.includes(req.params.name)) {
      const districts = await District.findAll({
        where: { name: req.params.name },
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
        raw: true,
      });
      res.json(districts);
    } else {
      const districts = await District.findAll({
        where: { name: req.params.name },
        include: anomaly_join,
        group: ["District.code"],
        attributes: [
          "code",
          "name",
          "parent_code",
          [sequelize.fn("COUNT", "anomaly_id"), "count"],
        ],
        raw: true,
      });
      res.json(districts);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

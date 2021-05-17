import express from "express";
import { sequelize, Sequelize } from "../database/models";
import Province from "../database/models/province";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const province = await Province.findAll({});
    res.json(province);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:code", async (req, res, next) => {
  try {
    const province = await Province.findOne({
      where: { code: req.params.code },
    });
    res.json(province);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const province = await Province.findOne({
      where: { region_name: req.params.name },
    });
    res.json(province);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

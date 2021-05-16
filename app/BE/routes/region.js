import express from "express";
import Region from "../database/models/region";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const regions = await Region.findAll();
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

router.get("/:name", async (req, res, next) => {
  try {
    const region = await Region.findOne({
      where: { region_name: req.params.name },
    });
    res.json(region);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

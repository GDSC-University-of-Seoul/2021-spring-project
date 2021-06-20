import express from "express";
import Area from "../database/models/facility-area";
import CCTV from "../database/models/cctv";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const { area_id } = req.query;
      let filters = {};
      if (area_id) {
        filters.area_id = area_id;
      }
      const cctvs = await CCTV.findAll({
        include: {
          model: Area,
          attributes: [],
          where: filters,
        },
      });
      res.json(cctvs);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const cctv = await CCTV.create({
        area_id: req.body.area_id,
        quality: req.body.quality,
        install_date: req.body.install_date,
      });
      res.status(201).json(cctv);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get("/:cctv_id", async (req, res, next) => {
  try {
    const cctv = await CCTV.findOne({
      where: { cctv_id: req.params.cctv_id },
    });
    res.json(cctv);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

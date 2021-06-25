import express from "express";
import CCTV from "../../DB/models/transform/cctv";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const { center_id } = req.query;
      let filters = {};
      if (center_id) {
        filters.center_id = center_id;
      }
      const cctvs = await CCTV.findAll({
        include: {
          model: Center,
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
        center_id: req.body.center_id,
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

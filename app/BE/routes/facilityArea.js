import express from "express";
import FacilityArea from "../../DB/models/facilityArea";
import ChildCareCenter from "../../DB/models/childCareCenter";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const { center_id, center_name } = req.query;
      let filters = {};
      if (center_id) {
        filters.center_id = center_id;
      }
      if (center_name) {
        filters.name = center_name;
      }
      const areas = await FacilityArea.findAll({
        include: {
          model: ChildCareCenter,
          attributes: [],
          where: filters,
        },
      });
      res.json(areas);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const facilityArea = await FacilityArea.create({
        center_id: req.body.center_id,
        area_name: req.body.area_name,
        area_usage: req.body.area_usage,
      });
      res.status(201).json(facilityArea);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get("/:area_id", async (req, res, next) => {
  try {
    const area = await FacilityArea.findOne({
      where: { area_id: req.params.area_id },
    });
    res.json(area);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

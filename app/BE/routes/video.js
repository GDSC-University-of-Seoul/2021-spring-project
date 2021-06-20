import express from "express";
import CCTV from "../../DB/models/cctv";
import Video from "../../DB/models/video";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { cctv_id } = req.query;
    let filters = {};
    if (cctv_id) {
      filters.cctv_id = cctv_id;
    }
    const videos = await Video.findAll({
      include: {
        model: CCTV,
        attributes: [],
        where: filters,
      },
    });
    res.json(videos);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:video_id", async (req, res, next) => {
  try {
    const video = await Video.findOne({
      where: { video_id: req.params.video_id },
    });
    res.json(video);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

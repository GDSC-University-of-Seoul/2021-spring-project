import express from "express";
import cctvController from "../../controllers/cctv";

const router = express.Router();

router
  .route("/")
  .get(cctvController.findByCenterId)
  .post(cctvController.create);

router
  .route("/:cctv_mac")
  .put(cctvController.update)
  .delete(async (req, res, next) => {
    try {
      await CCTV.destroy({
        where: {
          cctv_mac: req.params.cctv_mac,
        },
      });
      res.status(204).send();
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;

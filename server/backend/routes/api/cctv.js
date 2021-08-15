import express from "express";
import cctvController from "../../controllers/cctv";

const router = express.Router();

router
  .route("/")
  .get(cctvController.findByCenterId)
  .post(cctvController.create);

router
  .route("/:cctv_mac")
  .put(async (req, res, next) => {
    try {
      const cctv = await CCTV.update(
        {
          cctv_name: req.body.cctv_name,
          install_date: req.body.install_date,
          uninstall_date: req.body.uninstall_date,
          quality: req.body.quality,
        },
        {
          where: {
            cctv_mac: req.params.cctv_mac,
          },
        }
      );
      res.json(cctv);
    } catch (err) {
      if (err instanceof Sequelize.UniqueConstraintError) {
        res.status(409).send("Duplicate cctv_mac value.");
      }
      console.error(err);
      next(err);
    }
  })
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

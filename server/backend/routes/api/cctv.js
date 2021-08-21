import express from "express";
import cctvController from "../../controllers/cctv";

const router = express.Router();

router.route("/").get(cctvController.findAll).post(cctvController.create);

router
  .route("/:cctv_mac")
  .put(cctvController.updateByCctvMac)
  .delete(cctvController.deleteByCctvMac);

module.exports = router;

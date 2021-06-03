import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.send("Connected");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

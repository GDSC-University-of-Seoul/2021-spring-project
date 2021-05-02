import express from "express";
import { sequelize } from "./database/models/index";

require("dotenv").config();

const app = express();
app.set("port", process.env.PORT || 3000);

// express
sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("DB 연결 실패");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Connnected.");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "빈 포트에서 대기중.");
});

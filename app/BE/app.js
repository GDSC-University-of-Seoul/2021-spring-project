import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { swaggerUi, swaggerSpecs } from "./swagger";
import { sequelize } from "./database/models";
import indexRouter from "./routes";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);

// DB 연결
sequelize
  .sync({ force: false, alter: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("DB 연결 실패");
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// localhost:3000/ 연결
app.use("/api/", indexRouter);
app.use("/api/docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// 포트 연결
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "빈 포트에서 대기중.");
});

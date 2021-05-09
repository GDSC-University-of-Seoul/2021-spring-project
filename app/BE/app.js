import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { sequelize } from "./database/models";

require("dotenv").config();

const app = express();
app.set("port", process.env.PORT || 3000);

const swaggerDefinition = {
  info: {
    title: "Kids Keeper Dev API",
    version: "1.0.0",
    description: "Kids Keeper Developmenet API with express.",
  },
  host: "localhost:3000",
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpecs = swaggerJsdoc(options);

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const db = require("./database/models");

// localhost:3000/ 연결
app.get("/", (req, res) => {
  res.send("Connnected.");
});

// 포트 연결
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "빈 포트에서 대기중.");
});

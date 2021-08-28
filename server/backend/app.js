import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import cors from "cors";
import passport from "passport";

import { sequelize } from "../database/models/transform";
import indexRouter from "./routes";
import passportConfig from "./passports";

dotenv.config();
passportConfig();

const app = express();
app.set("port", process.env.PORT || 3000);

// DB 연결
sequelize
  .sync({ force: false, alter: false })
  .then(() => {
    console.log("DB connection succeeded.");
  })
  .catch((err) => {
    console.log("DB connection fail.");
    console.error(err);
  });

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

const swaggerSpecs = yaml.load(path.join(__dirname, "/swagger/build.yaml"));
app.use("/api/docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// internal server error handler
app.use((err, req, res, next) => {
  res.status(500).send({ errors: err.errors });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "HTTP server listening on port.");
});

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import fs from "fs";
import https from "https";

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
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("DB 연결 실패");
    console.log(err);
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

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

const swaggerSpecs = yaml.load(path.join(__dirname, "/swagger/build.yaml"));
app.use("/api/docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(8081, () => {
  console.log(8081, "빈 포트에서 대기중.");
});

// https
const key = fs.readFileSync("./certs/private.pem");
const cert = fs.readFileSync("./certs/public.pem");
const options = {
  key: key,
  cert: cert,
};
const server = https.createServer(options, app);

server.listen(app.get("port"), () => {
  console.log(app.get("port"), "빈 포트에서 대기중.");
});

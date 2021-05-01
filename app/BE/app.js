require("dotenv").config()

const awsIot = require("aws-iot-device-sdk");
const express = require("express");
const mqtt = require("mqtt");
const models = require("./database/models/index.js")

const app = express();
app.set("port", process.env.PORT || 3000);

models.sequelize.sync().then(() => {
    console.log("DB 연결 성공");
}).catch((err) => {
    console.log("DB 연결 실패");
    console.log("err");
})

//express
app.get('/', (req, res) => {
    res.send("Connnected.");
})

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "빈 포트에서 대기중.");
})
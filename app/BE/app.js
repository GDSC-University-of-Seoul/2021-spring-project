require("dotenv").config()

const awsIot = require("aws-iot-device-sdk");
const express = require("express");
const mqtt = require("mqtt");

const app = express();
app.set("port", process.env.PORT || 3000);
const client = mqtt.connect("mqtt://localhost:1883");

// AWS IoT
let device = new awsIot.device({
    keyPath: process.env.KEY_PATH,
    certPath: process.env.CERT_PATH,
    caPath: process.env.CA_PATH,
    clientId: process.env.CLIENT_ID,
    host: process.env.HOST
})

device.on('connect', function() {
    console.log('connect');
    
    device.subscribe('topic_2');
    device.publish('topic_1', JSON.stringify({ test_data: 1}));
  });

device.on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });


//mqtt
client.on("connect", () => {
    console.log("connected : " + client.connected);
})

client.on("message", (topic, message, packet) => {
    console.log("message : " + message);
    console.log("topic : " + topic);
})

client.on("error", (error) => {
    console.log("not connected : " + error);
})

client.subscribe("test")


//express
app.get('/', (req, res) => {
    res.send("Connnected.");
})

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "빈 포트에서 대기중.");
})
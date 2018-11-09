const functions = require("firebase-functions");
const cors = require("cors")
const request = require("request");

const express = require("express");
const app = express();

app.use(cors({ origin: true }));

const SUBWAY_STATION_URL = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getStationsByLine";
const REAL_TIME_URL = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getTime";

app.get("/stations/:subwayLine", (req, res) => {
    const url = `${SUBWAY_STATION_URL}/${req.params.subwayLine}`;
    request(url, (err, response, body) => {
        const parsedResponse = JSON.parse(JSON.parse(body));
        res.json(parsedResponse);
    });
});

app.get("/realTime/:subwayLine/:station", (req, res) => {
    const url = `${REAL_TIME_URL}/${req.params.subwayLine}/${req.params.station}`;
    request(url, (err, response, body) => {
        const parsedResponse = JSON.parse(body);
        res.json(parsedResponse);
    });
});

exports.mta = functions.https.onRequest(app);
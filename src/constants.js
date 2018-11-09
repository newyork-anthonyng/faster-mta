const STATIONS_FOR_TRAIN_LINE_URL = "https://us-central1-faster-mta.cloudfunctions.net/mta/stations";
const REAL_TIME_FOR_STATION = "https://us-central1-faster-mta.cloudfunctions.net/mta/realTime";

const SUBWAYS = [
    { name: 1, color: "red" },
    { name: 2, color: "red" },
    { name: 3, color: "red" },
    { name: 4, color: "green" },
    { name: 5, color: "green" },
    { name: 6, color: "green" },
    { name: 7, color: "purple" },
    { name: "A", color: "blue" },
    { name: "C", color: "blue" },
    { name: "E", color: "blue" },
    { name: "G", color: "lime" },
    { name: "B", color: "orange" },
    { name: "D", color: "orange" },
    { name: "F", color: "orange" },
    { name: "M", color: "orange" },
    { name: "J", color: "brown" },
    { name: "Z", color: "brown" },
    { name: "L", color: "gray" },
    { name: "S", color: "gray" },
    { name: "N", color: "yellow" },
    { name: "R", color: "yellow" },
    { name: "Q", color: "yellow" }
];

// These exports are used in webpack.config.js
module.exports = {
    STATIONS_FOR_TRAIN_LINE_URL,
    REAL_TIME_FOR_STATION,
    SUBWAYS
};
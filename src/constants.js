const STATIONS_FOR_TRAIN_LINE_URL = `https://traintimelb-367443097.us-east-1.elb.amazonaws.com/getStationsByLine`;
const REAL_TIME_FOR_STATION = `https://traintimelb-367443097.us-east-1.elb.amazonaws.com/getTime`;

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

export { 
    STATIONS_FOR_TRAIN_LINE_URL,
    REAL_TIME_FOR_STATION,
    SUBWAYS
};
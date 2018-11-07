import { STATIONS_FOR_TRAIN_LINE_URL, REAL_TIME_FOR_STATION } from "./constants";

function getStationsForTrainLine(trainLine) {
    return fetch(`${STATIONS_FOR_TRAIN_LINE_URL}/${trainLine}`)
        .then(a => a.text())
        .then(a => {
            return JSON.parse(JSON.parse(a));
        });
}

function getRealTimeForStation(trainLine, station) {
    return fetch(`${REAL_TIME_FOR_STATION}/${trainLine}/${station}`)
        .then(a => a.json());
}

function getSubwayMapUrl() {
    // Need to make fetch call
    // <object> calls don't go through serviceworker cache
    // https://www.chromestatus.com/feature/6313531834105856
    // https://w3c.github.io/ServiceWorker/#implementer-concerns
    return fetch("./subway_map.pdf")
        .then(response => response.blob())
        .then(blob => {
            return URL.createObjectURL(blob);
        })
}

function getCachedRealTimeForStation(trainLine, station) {
    const url = `${REAL_TIME_FOR_STATION}/${trainLine}/${station}`;
    return caches.match(url).then(response => {
        if (response) {
            return response.json();
        }
        return Promise.resolve();
    });
}

export {
    getStationsForTrainLine,
    getRealTimeForStation,
    getSubwayMapUrl,
    getCachedRealTimeForStation
}
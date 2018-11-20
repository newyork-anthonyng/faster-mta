import { LOCAL_STORAGE_KEY } from "./constants";

function filterDuplicateStations(stationsList) {
    const duplicateChecker = [];
    return stationsList.filter(({ stationName }) => {
        if (duplicateChecker.indexOf(stationName) > -1) {
            return false;
        } else {
            duplicateChecker.push(stationName);
            return true;
        }
    });
}

function saveRecentlyViewedStations(stationName, hash) {
    let stationsList = [{ stationName, hash }];

    const original = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (original) {
        const _parsedOriginal = JSON.parse(original);
        stationsList = stationsList.concat(_parsedOriginal);
        stationsList = filterDuplicateStations(stationsList);
    }

    stationsList = stationsList.slice(0, 3);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stationsList));
}

function getRecentlyViewedStations() {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
}

export {
    saveRecentlyViewedStations,
    getRecentlyViewedStations
};
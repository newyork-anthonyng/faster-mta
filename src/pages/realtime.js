import renderLoadingContainer from "./loading";
import { renderPage } from "../utils";
import {
    getCachedRealTimeForStation,
    getRealTimeForStation
} from "../fetchInfo";

function renderRealTimePage(trainLine, station) {
    renderLoadingContainer();

    // If cached data is available, show that first while fetching the latest data
    getCachedRealTimeForStation(trainLine, station)
        .then(response => {
            updateRealTime({ trainLine, response })
        });

    getRealTimeForStation(trainLine, station)
        .then(response => {
            updateRealTime({ trainLine, response })
        });
}

function updateRealTime({ response, trainLine }) {
    // Don't re-render page with outdated information
    // This can happen if the API call for new information is faster than the cache opening
    const renderedTimeEl = document.querySelector(".js-last-updated");
    if (renderedTimeEl) {
        const currentTime = new Date(parseInt(`${response.lastUpdatedOn}000`));
        const renderedTime = new Date(parseInt(renderedTimeEl.dataset.lastUpdated));

        if (renderedTime && currentTime < renderedTime) {
            return;
        }
    }

    const containerEle = document.createElement("div");

    const backEle = document.createElement("a");
    backEle.setAttribute("href", `#subway/${trainLine}`);
    const backText = document.createTextNode("back");
    backEle.appendChild(backText);
    containerEle.appendChild(backEle);

    const { lastUpdatedTime, lastUpdatedOn, direction1, direction2 } = response;
    const pEle = document.createElement("p");
    pEle.classList.add("js-last-updated")
    pEle.dataset.lastUpdated = `${lastUpdatedOn}000`;
    const date = lastUpdatedTime;
    const pText = document.createTextNode(date);
    pEle.appendChild(pText);
    containerEle.appendChild(pEle);

    const directions = [direction1, direction2];
    directions.forEach(direction => {
        const ulEle = document.createElement("ul");
        const directionEle = document.createElement("li");
        const directionText = document.createTextNode(direction.name);
        directionEle.appendChild(directionText);
        ulEle.appendChild(directionEle);

        direction.times.forEach(time => {
            const { lastStation, minutes, route } = time;
            const timeEle = document.createElement("li");
            const text = `${route}  ${lastStation}  ${minutes}`;
            const timeText = document.createTextNode(text);
            timeEle.appendChild(timeText);

            ulEle.appendChild(timeEle);
        });

        containerEle.appendChild(ulEle);
    });

    renderPage(containerEle);
}

export default renderRealTimePage;
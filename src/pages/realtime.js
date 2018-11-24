import renderLoadingContainer from "./loading";
import renderBackButton from "./backButton";
import { renderPage, createElementWithText } from "../utils";
import { getRealTimeForStation } from "../fetchInfo";
import { saveRecentlyViewedStations } from "../recentlyViewedStations";

function renderRealTimePage(trainLine, station) {
  renderLoadingContainer();

  getRealTimeForStation(trainLine, station).then(response => {
    updateRealTime({ trainLine, response });

    const { stationName } = response;
    saveRecentlyViewedStations(stationName, location.hash);
  });
}

function updateRealTime({ response, trainLine }) {
  const containerEle = document.createElement("div");

  const backEle = renderBackButton(`#subway/${trainLine}`);
  containerEle.appendChild(backEle);

  const { lastUpdatedTime, lastUpdatedOn, direction1, direction2 } = response;
  const date = lastUpdatedTime;
  const pEle = createElementWithText("p", date);
  pEle.classList.add("js-last-updated");
  pEle.dataset.lastUpdated = `${lastUpdatedOn}000`;

  containerEle.appendChild(pEle);

  const directions = [direction1, direction2].filter(
    direction => direction.times.length > 0
  );

  directions.forEach(direction => {
    const directionEle = createElementWithText("h2", direction.name);
    containerEle.appendChild(directionEle);

    const tableEle = document.createElement("table");
    const thead = document.createElement("tr");

    const subwayLineHead = createElementWithText("th", "Subway Line");
    const minutesAwayHead = createElementWithText("th", "Minutes away");
    const destinationHead = createElementWithText("th", "Destination");

    thead.appendChild(subwayLineHead);
    thead.appendChild(minutesAwayHead);
    thead.appendChild(destinationHead);
    tableEle.appendChild(thead);

    direction.times.forEach(time => {
      const { lastStation, minutes, route } = time;
      const rowEle = document.createElement("tr");

      const subwayRouteCell = createElementWithText("td", `${route}`);
      const subwayStationCell = createElementWithText("td", `${lastStation}`);
      const minutesAwayCell = createElementWithText("td", `${minutes}`);

      rowEle.appendChild(subwayRouteCell);
      rowEle.appendChild(minutesAwayCell);
      rowEle.appendChild(subwayStationCell);
      tableEle.appendChild(rowEle);
    });

    containerEle.appendChild(tableEle);
  });

  renderPage(containerEle);
}

export default renderRealTimePage;

import renderLoadingContainer from "./loading";
import { getStationsForTrainLine } from "../fetchInfo";
import { renderPage } from "../utils";

function renderSubwayPage(trainLine) {
    renderLoadingContainer();

    getStationsForTrainLine(trainLine)
        .then(a => {
            const containerEle = document.createElement("div");

            const backEle = document.createElement("a");
            backEle.setAttribute("href", `#home`);
            const backText = document.createTextNode("back");
            backEle.appendChild(backText);
            containerEle.appendChild(backEle);

            a.forEach(b => {
                const ulEle = document.createElement("ul");

                const boroughEle = document.createElement("li");
                const boroughText = document.createTextNode(b.borough);
                boroughEle.appendChild(boroughText);
                ulEle.appendChild(boroughEle);

                b.stations.forEach(station => {
                    const stationEle = document.createElement("li");
                    const aEle = document.createElement("a");
                    const stationText = document.createTextNode(station.name);
                    aEle.setAttribute("href", `#realtime/${trainLine}/${station.id}`);

                    aEle.appendChild(stationText);
                    stationEle.appendChild(aEle);
                    stationEle.setAttribute("data-station-id", station.id);
                    ulEle.appendChild(stationEle);
                });
                 
                containerEle.appendChild(ulEle);
            });

            renderPage(containerEle);
        });
}

export default renderSubwayPage;
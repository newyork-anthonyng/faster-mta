import renderLoadingContainer from "./loading";
import renderBackButton from "./backButton";
import { getStationsForTrainLine } from "../fetchInfo";
import { renderPage, createElementWithText } from "../utils";

function renderSubwayPage(trainLine) {
    renderLoadingContainer();

    getStationsForTrainLine(trainLine)
        .then(a => {
            const containerEle = document.createElement("div");
            const backEle = renderBackButton("#home");
            containerEle.appendChild(backEle); 

            a.forEach(b => {
                const ulEle = document.createElement("ul");

                const boroughEle = createElementWithText("li", b.borough);
                ulEle.appendChild(boroughEle);

                b.stations.forEach(station => {
                    const stationEle = document.createElement("li");
                    const aEle = createElementWithText("a", station.name);
                    aEle.setAttribute("href", `#realtime/${trainLine}/${station.id}`);

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
import { SUBWAYS } from "../constants";
import { renderPage, createElementWithText } from "../utils";
import { getRecentlyViewedStations } from "../recentlyViewedStations";

const listStyle = "display: flex; flex-wrap: wrap;";
const listItemStyle = "width: 33%; display: flex; align-items: center;";
const linkStyle = "font-size: 24px;";
const colorStyle =
  "width: 20px; height: 20px; display: inline-block; margin-right: 5px;";

function renderHomePage() {
  const ulEle = document.createElement("ul");
  ulEle.setAttribute("style", listStyle);

  SUBWAYS.forEach(subway => {
    const liEle = document.createElement("li");
    liEle.setAttribute("style", listItemStyle);

    const aEle = createElementWithText("a", subway.name);
    aEle.setAttribute("href", `#subway/${subway.name}`);
    aEle.setAttribute("style", linkStyle);

    const colorEle = document.createElement("div");
    colorEle.setAttribute(
      "style",
      `${colorStyle} background-color: ${subway.color}`
    );
    liEle.appendChild(colorEle);

    liEle.appendChild(aEle);
    ulEle.appendChild(liEle);
  });

  const containerEle = document.createElement("div");

  const recentlyViewedStations = getRecentlyViewedStations();
  if (recentlyViewedStations) {
    const headerEle = createElementWithText("h2", "Recently viewed stations");
    containerEle.appendChild(headerEle);

    const recentlyViewedUlEle = document.createElement("ul");
    const parsedRecentlyViewedStations = JSON.parse(recentlyViewedStations);
    parsedRecentlyViewedStations.forEach(recentlyViewed => {
      const recentlyViewedEle = createElementWithText("a", recentlyViewed.stationName);
      recentlyViewedEle.setAttribute("href", recentlyViewed.hash);

      const recentlyViewedLiEle = document.createElement("li");
      recentlyViewedLiEle.appendChild(recentlyViewedEle);
      recentlyViewedUlEle.appendChild(recentlyViewedLiEle);
    });

    containerEle.appendChild(recentlyViewedUlEle);
  }

  containerEle.appendChild(ulEle);
  renderPage(containerEle);
}

export default renderHomePage;

import { getSubwayMapUrl } from "../fetchInfo";
import { renderPage } from "../utils";

function renderSubwayMap() {
  getSubwayMapUrl().then(subwayMapUrl => {
    const objEle = document.createElement("object");
    objEle.setAttribute("width", 500);
    objEle.setAttribute("height", 375);
    objEle.setAttribute("type", "application/pdf");
    objEle.setAttribute("data", subwayMapUrl);

    renderPage(objEle);
  });
}

export default renderSubwayMap;

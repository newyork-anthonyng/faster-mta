import { getSubwayMapUrl } from "../fetchInfo";
import { renderPage } from "../utils";

const objectStyle = "height: 100%; width: 100%";

function renderSubwayMap() {
  getSubwayMapUrl().then(subwayMapUrl => {
    const objEle = document.createElement("object");
    objEle.setAttribute("type", "application/pdf");
    objEle.setAttribute("style", objectStyle);
    objEle.setAttribute("data", subwayMapUrl);

    renderPage(objEle);
  });
}

export default renderSubwayMap;

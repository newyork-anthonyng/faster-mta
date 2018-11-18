import { renderPage } from "../utils";

function renderLoadingContainer() {
  const containerEle = document.createElement("div");
  const pEle = document.createElement("p");
  const textNode = document.createTextNode("Loading...");
  pEle.appendChild(textNode);
  containerEle.appendChild(pEle);
  renderPage(containerEle);
}

export default renderLoadingContainer;

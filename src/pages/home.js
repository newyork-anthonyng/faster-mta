import { SUBWAYS } from "../constants";
import { renderPage } from "../utils";

function renderHomePage() {
    const ulEle = document.createElement("ul");
    SUBWAYS.forEach(subway => {
        const liEle = document.createElement("li");
        const aEle = document.createElement("a");
        aEle.setAttribute("href", `#subway/${subway.name}`);
        const textEle = document.createTextNode(subway.name);
        aEle.appendChild(textEle);
        liEle.appendChild(aEle);
        ulEle.appendChild(liEle);
    });

    renderPage(ulEle);
}

export default renderHomePage;
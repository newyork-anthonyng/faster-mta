import { SUBWAYS } from "../constants";
import { renderPage, createElementWithText } from "../utils";

const listStyle = "display: flex; flex-wrap: wrap;";
const listItemStyle = "width: 33%;";
const linkStyle = "font-size: 24px;";

function renderHomePage() {
    const ulEle = document.createElement("ul");
    ulEle.setAttribute("style", listStyle);

    SUBWAYS.forEach(subway => {
        const liEle = document.createElement("li");
        liEle.setAttribute("style", listItemStyle);

        const aEle = createElementWithText("a", subway.name);
        aEle.setAttribute("href", `#subway/${subway.name}`);
        aEle.setAttribute("style", linkStyle);

        liEle.appendChild(aEle);
        ulEle.appendChild(liEle);
    });

    renderPage(ulEle);
}

export default renderHomePage;
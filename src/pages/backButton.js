function renderBackButton(href) {
    const backEle = document.createElement("a");
    backEle.setAttribute("href", href);

    const backText = document.createTextNode("back");
    backEle.appendChild(backText);

    return backEle;
}

export default renderBackButton;
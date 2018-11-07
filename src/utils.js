function removeChildrenFromNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function renderPage(page) {
    const main = document.querySelector(".js-main");
    removeChildrenFromNode(main);
    main.appendChild(page);
}

export {
    renderPage
};
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

function createElementWithText(elementType, text) {
  const el = document.createElement(elementType);
  const textNode = document.createTextNode(text);
  el.appendChild(textNode);

  return el;
}

export { renderPage, createElementWithText };

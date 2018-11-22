const linkStyle = "display: inline-block; margin-bottom: 16px;";

function renderBackButton(href) {
  const backEle = document.createElement("a");
  backEle.setAttribute("href", href);
  backEle.setAttribute("style", linkStyle);

  const backText = document.createTextNode("back");
  backEle.appendChild(backText);

  return backEle;
}

export default renderBackButton;

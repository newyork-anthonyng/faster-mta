import renderLoadingContainer from "./loading";
import renderBackButton from "./backButton";
import { getStationsForTrainLine } from "../fetchInfo";
import { renderPage, createElementWithText } from "../utils";

const tabStyle = "border: 1px solid gray; font-size: 16px; padding: 12px; cursor: pointer;";
const activeTabStyle = tabStyle + "border-top: 5px solid blue; border-bottom: 0;";

function renderSubwayPage(trainLine) {
  renderLoadingContainer();

  getStationsForTrainLine(trainLine).then(boroughs => {
    const containerEle = document.createElement("div");
    const backEle = renderBackButton("#home");
    containerEle.appendChild(backEle);

    const tabContainerEle = document.createElement("div");
    const tabListEle = document.createElement("div");
    tabListEle.setAttribute("role", "tablist")
    const tabPanelFragment = document.createDocumentFragment();

    boroughs.forEach((borough, index) => {
      // create Tab for each borough
      const tabEle = createElementWithText("button", borough.borough);
      
      tabEle.setAttribute("aria-controls", `${borough.borough}-panel`);
      tabEle.setAttribute("aria-selected", "false");
      tabEle.setAttribute("id", `${borough.borough}-tab`);
      tabEle.setAttribute("role", "tab");
      tabEle.setAttribute("style", tabStyle);
      tabEle.setAttribute("tabindex", "-1");
      tabEle.index = index;
      
      tabListEle.appendChild(tabEle);

      // create Panel for each borough
      const tabPanelEle = document.createElement("ul");
      tabPanelEle.setAttribute("aria-labelledby", `${borough.borough}-tab`);
      tabPanelEle.setAttribute("hidden", "");
      tabPanelEle.setAttribute("id", `${borough.borough}-panel`);
      tabPanelEle.setAttribute("role", "tabpanel");
      tabPanelEle.setAttribute("tabindex", "0");

      // Show first Tab and Panel
      if (index === 0) {
        tabPanelEle.removeAttribute("hidden", "");
        tabEle.removeAttribute("tabindex", "-1");
        tabEle.setAttribute("aria-selected", "true");
        tabEle.setAttribute("style", activeTabStyle);
      }

      tabPanelFragment.appendChild(tabPanelEle);

      borough.stations.forEach(station => {
        const stationEle = document.createElement("li");
        const aEle = createElementWithText("a", station.name);
        aEle.setAttribute("href", `#realtime/${trainLine}/${station.id}`);

        stationEle.appendChild(aEle);
        tabPanelEle.appendChild(stationEle);
      });
    });

    tabContainerEle.appendChild(tabListEle);
    tabContainerEle.appendChild(tabPanelFragment);
    containerEle.appendChild(tabContainerEle);

    renderPage(containerEle);
    addTabEventListeners(tabContainerEle);
  });
}

function addTabEventListeners(tabContainerEle) {
  const tabs = tabContainerEle.querySelectorAll(`[role="tab"]`);
  const panels = tabContainerEle.querySelectorAll(`[role="tabpanel"]`);

  const KEYS = {
    end: 35,
    home: 36,
    left: 37,
    right: 39,
  };

  const DIRECTION = {
    [KEYS.left]: -1,
    [KEYS.right]: 1,
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", handleClickFromTab);
    tab.addEventListener("keyup", handleKeyUpFromTab);
  });

  function handleClickFromTab(e) {
    activateTab(e.target);
  }

  function handleKeyUpFromTab(e) {
    switch(e.keyCode) {
      case KEYS.left:
      case KEYS.right:
        let nextIndex = e.target.index + DIRECTION[e.keyCode];
        if (nextIndex >= tabs.length) {
          nextIndex = 0;
        }
        if (nextIndex < 0) {
          nextIndex = (tabs.length - 1);
        }
        if (tabs[nextIndex]) {
          activateTab(tabs[nextIndex]);
        }
        break;
      case KEYS.home:
        activateTab(tabs[0]);
        break;
      case KEYS.end:
        activateTab(tabs[tabs.length - 1]);
        break;
      default:
        break;
    }
  }

  function activateTab(tab) {
    deactivateTabs();

    tab.removeAttribute("tabindex");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("style", activeTabStyle);

    const controls = tab.getAttribute("aria-controls");
    document.getElementById(controls).removeAttribute("hidden");
    tab.focus();
  }

  function deactivateTabs() {
    tabs.forEach(tab => {
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("style", tabStyle);
      tab.setAttribute("tabindex", "-1");
    });

    panels.forEach(panel => {
      panel.setAttribute("hidden", "");
    });
  }
}

export default renderSubwayPage;
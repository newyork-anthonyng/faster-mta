import renderHomePage from "./pages/home";
import renderSubwayPage from "./pages/subway";
import renderRealTimePage from "./pages/realtime";
import renderSubwayMap from "./pages/subwaymap";
import { pageView } from "./analytics";

window.onhashchange = handleHashChange;

function handleHashChange() {
  const hash = location.hash.slice(1);
  const routes = hash.split("/");

  // TODO: Refactor this to use Open/Closed principle
  switch (routes[0]) {
    case "subway":
      if (routes[1]) {
        renderSubwayPage(routes[1]);
        pageView(`/subway/${routes[1]}`);
      } else {
        window.history.pushState({}, "", "#home");
      }
      break;
    case "realtime":
      const trainLine = routes[1];
      const station = routes[2];
      if (trainLine && station) {
        renderRealTimePage(trainLine, station);
        pageView(`realtime/${trainLine}/${station}`);
      } else {
        window.history.pushState({}, "", "#home");
      }
      break;
    case "subway_map":
      renderSubwayMap();
      pageView("subway_map");
      break;
    case "home":
    default:
      renderHomePage();
      pageView("home");
      break;
  }
}

handleHashChange();

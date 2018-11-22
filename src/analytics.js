// expects Google Analytics function, ga,  to be loaded
// https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging

function pageView(pageName) {
    let _pageName = pageName;

    if (_pageName[0] !== '/') {
        _pageName = `/${_pageName}`;
    }

    if (typeof ga !== "undefined") {
        ga('send', 'pageview', _pageName);
    } else {
        console.error("Google Analytics not found");
    }
}

export { pageView };
// expects Google Analytics function, ga,  to be loaded
// https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging

function pageView(pageName) {
    let _pageName = pageName;

    if (_pageName[0] !== '/') {
        _pageName = `/${_pageName}`;
    }

    ga('send', 'pageview', _pageName);
}

export { pageView };
const REAL_TIME_URL = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getTime";
const CACHE_NAME = "hbfs-mta-cache-v1";
const urlsToCache = [
   "/",
   "/index.html",
   "/mta.js",
   "/subway_map.pdf"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener("fetch", event => {
    if (event.request.url.indexOf(REAL_TIME_URL) > -1) {
        // When looking for realTime info, we follow a "cache then network" strategy
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return fetch(event.request)
                        .then(response => {
                            cache.put(event.request, response.clone());
                            return response;
                        })
                })
        )
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }

                    // Otherwise, make new fetch request and cache the response
                    const fetchRequest = event.request.clone();

                    return fetch(fetchRequest)
                        .then(response => {
                            // Don't cache invalid responses
                            if (!response || response.status !== 200) {
                                return response;
                            }

                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    console.log(`ServiceWorker: caching request for ${response.url}`)
                                    cache.put(event.request, responseToCache);
                                });

                            return response;
                        });
                })
        )
    }
});
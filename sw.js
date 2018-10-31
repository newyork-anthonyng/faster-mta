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
});
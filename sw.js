// The app moved to app/ (18/10/2026). Browsers that installed the old root-scope worker fetch this
// file on their next update check: it unregisters itself and reloads open pages, so the root shows the
// homepage again and the app's own worker under app/ takes over there. The cache is shared with the app; leave it.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.registration.unregister()
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => clients.forEach((c) => c.navigate(c.url)))
  );
});

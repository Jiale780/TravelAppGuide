/* The condition is that to register and load of the service worker of the application*/
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(reg => {
      console.log("Service worker has been registered and loaded.", reg);
    });
  });
}

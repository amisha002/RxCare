export function registerServiceWorker(): void {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration: ServiceWorkerRegistration) => {
          console.log("ServiceWorker registered with scope:", registration.scope);
        })
        .catch((error: unknown) => {
          console.error("ServiceWorker registration failed:", error);
        });
    });
  }
}

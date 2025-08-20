"use client";
import { useEffect, useState } from "react";

type ConnectionStatus = "online" | "offline" | "hidden";

export default function ConnectionBanner() {
  const [status, setStatus] = useState<ConnectionStatus>("hidden");

  useEffect(() => {
    const handleOffline = () => setStatus("offline");
    const handleOnline = () => {
      setStatus("online");
      // hide after 3 seconds
      setTimeout(() => setStatus("hidden"), 3000);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    if (!navigator.onLine) {
      setStatus("offline");
    }

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (status === "hidden") return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 
        max-w-xs w-[90%] sm:max-w-sm md:max-w-md
        text-white text-center px-4 py-3 rounded-lg shadow-lg
        transition-transform duration-300 ease-in-out z-[9999]
        ${status === "offline" ? "bg-red-600" : "bg-green-600"}
        ${status !== "hidden" ? "translate-y-0" : "translate-y-24"}`}
    >
      {status === "offline"
        ? "⚠ You are offline — some features may be unavailable"
        : "✅ Back online — all features restored"}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/serviceWorkerRegister";

export default function ServiceWorkerProvider() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null; // nothing to render
}

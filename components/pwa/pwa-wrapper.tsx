"use client"

import type React from "react"

import { useEffect } from "react"
import { InstallPrompt } from "./install-prompt"

export function PWAWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }

    // Handle online/offline status
    const handleOnline = () => {
      console.log("App is online")
    }

    const handleOffline = () => {
      console.log("App is offline")
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <>
      {children}
      {/* Install prompt respects suppression period via localStorage, see component */}
      <InstallPrompt />
    </>
  )
}

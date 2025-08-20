"use client"

import type React from "react"

import { useEffect } from "react"
import { InstallPrompt } from "./install-prompt"
import { initializeMobileNotifications } from "@/lib/mobileNotifications"
import { subscribeToPush } from "@/lib/pushClient"

export function PWAWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const swUrl = process.env.NODE_ENV === 'production' ? '/sw.js' : '/sw-dev.js'
      console.log("🔧 Registering service worker:", swUrl)
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("SW registered: ", registration)
          console.log("🔧 SW Scope:", registration.scope)
          console.log("🔧 SW Active:", registration.active)
          console.log("🔧 SW Waiting:", registration.waiting)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }

    // Initialize Capacitor Local Notifications when running natively
    initializeMobileNotifications()

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

  useEffect(() => {
    const vapid = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    console.log("🔑 VAPID Key check:", vapid ? "Found" : "Missing")
    if (vapid) {
      console.log("🚀 Attempting push subscription...")
      subscribeToPush(vapid).then(success => {
        console.log("📱 Push subscription result:", success ? "Success" : "Failed")
      }).catch(error => {
        console.error("❌ Push subscription error:", error)
      })
    } else {
      console.error("❌ NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set!")
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

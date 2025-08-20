"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { InstallPrompt } from "./install-prompt"
import { initializeMobileNotifications } from "@/lib/mobileNotifications"
import { subscribeToPush } from "@/lib/pushClient"

export function PWAWrapper({ children }: { children: React.ReactNode }) {
  const [pushStatus, setPushStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [retryCount, setRetryCount] = useState(0)
  const [swRegistered, setSwRegistered] = useState(false)

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
          
          // Wait for service worker to be ready
          return navigator.serviceWorker.ready
        })
        .then((registration) => {
          console.log("✅ Service worker is ready:", registration)
          setSwRegistered(true)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
          setPushStatus('error')
        })
    }

    // Initialize Capacitor Local Notifications when running natively
    initializeMobileNotifications()

    // Handle online/offline status
    const handleOnline = () => {
      console.log("App is online")
      // Retry push subscription when coming back online
      if (pushStatus === 'error') {
        setTimeout(() => attemptPushSubscription(), 2000)
      }
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

  const attemptPushSubscription = async () => {
    // Don't attempt if service worker isn't ready
    if (!swRegistered) {
      console.log("⏳ Waiting for service worker to be ready...")
      return
    }

    const vapid = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    console.log("🔑 VAPID Key check:", vapid ? "Found" : "Missing")
    
    if (!vapid) {
      console.error("❌ NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set!")
      setPushStatus('error')
      return
    }

    setPushStatus('loading')
    console.log("🚀 Attempting push subscription... (attempt", retryCount + 1, ")")
    
    try {
      // Check again for existing subscription to avoid duplicates
      try {
        const reg = await navigator.serviceWorker.ready
        const existingFirst = await reg.pushManager.getSubscription()
        if (existingFirst) {
          console.log("📱 Existing subscription found pre-flight; sending to backend and marking success")
          try {
            const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
            await fetch(`${apiBase}/api/push/subscribe`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(existingFirst),
            })
          } catch {}
          setPushStatus('success')
          setRetryCount(0)
          return
        }
      } catch {}

      const success = await subscribeToPush(vapid)
      console.log("📱 Push subscription result:", success)
      
      if (success) {
        console.log("📱 Push subscription successful!")
        setPushStatus('success')
        setRetryCount(0)
        return // Exit early on success
      } else {
        // Check if there's an existing subscription
        try {
          const reg = await navigator.serviceWorker.ready
          const existing = await reg.pushManager.getSubscription()
          if (existing) {
            console.log("📱 Found existing subscription, marking as success")
            setPushStatus('success')
            setRetryCount(0)
            return
          }
        } catch (e) {
          console.log("Could not check existing subscription:", e)
        }
        
        throw new Error("Push subscription returned false")
      }
    } catch (error) {
      console.error("❌ Push subscription error:", error)
      
      // Check if this is a push service error that shouldn't be retried
      if (error instanceof Error && 
          (error.message.includes("push service error") || 
           error.name === "AbortError")) {
        console.log("🚫 Push service error detected - stopping retries")
        setPushStatus('error')
        return // Don't retry for push service errors
      }
      
      setPushStatus('error')
      
      // Retry logic with exponential backoff (only for non-push-service errors)
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s
        console.log(`🔄 Retrying in ${delay}ms...`)
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
          attemptPushSubscription()
        }, delay)
      } else {
        console.error("❌ Max retry attempts reached")
      }
    }
  }

  useEffect(() => {
    // Only attempt push subscription after service worker is ready
    if (!swRegistered) return
    let cancelled = false
    ;(async () => {
      // Avoid duplicate attempts if there's already a subscription
      try {
        const reg = await navigator.serviceWorker.ready
        const existing = await reg.pushManager.getSubscription()
        if (existing) {
          console.log("📱 Existing push subscription present; skipping re-subscribe")
          setPushStatus('success')
          return
        }
      } catch {}
      if (!cancelled) {
        console.log("🚀 Service worker ready, attempting push subscription...")
        attemptPushSubscription()
      }
    })()
    return () => { cancelled = true }
  }, [swRegistered])

  return (
    <>
      {children}
      <InstallPrompt />
      
      {/* Success Indicator */}
      {pushStatus === 'success' && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 max-w-sm">
          <strong>✅ Push notifications enabled!</strong>
          <br />
          <small className="block mt-1">
            You'll receive medication reminders even when the app is closed
          </small>
          <button 
            onClick={() => setPushStatus('idle')}
            className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Error Indicator */}
      {pushStatus === 'error' && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-sm">
          <strong>Push notifications unavailable</strong>
          <br />
          <small className="block mt-1">
            {retryCount >= 3 ? 
              "Maximum retry attempts reached. This might be a browser compatibility issue." :
              "Check your browser settings and try refreshing"
            }
          </small>
          <div className="mt-2 flex gap-2">
            <button 
              onClick={() => {
                setRetryCount(0)
                setPushStatus('idle')
                setTimeout(() => attemptPushSubscription(), 1000)
              }}
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              Try Again
            </button>
            <button 
              onClick={() => setPushStatus('idle')}
              className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      
      {/* Loading Indicator */}
      {pushStatus === 'loading' && (
        <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50 max-w-sm">
          <strong>🔄 Setting up push notifications...</strong>
          <br />
          <small className="block mt-1">
            Please wait while we configure your notifications
          </small>
        </div>
      )}
    </>
  )
}

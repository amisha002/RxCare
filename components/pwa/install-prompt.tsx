"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5 text-blue-600" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800">Install RxCare</h3>
          <p className="text-xs text-gray-600 mt-1">
            Add RxCare to your home screen for quick access and offline features.
          </p>

          <div className="flex space-x-2 mt-3">
            <Button size="sm" onClick={handleInstall} className="bg-blue-600 hover:bg-blue-700 text-white">
              Install
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-gray-600">
              Not now
            </Button>
          </div>
        </div>

        <Button size="sm" variant="ghost" onClick={handleDismiss} className="flex-shrink-0 p-1">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

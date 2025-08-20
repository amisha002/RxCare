"use client"

import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* RxCare Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600 font-serif">RxCare</h1>
        </div>

        {/* Offline Icon */}
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-gray-400" />
        </div>

        {/* Offline Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">You're Offline</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          It looks like you've lost your internet connection. Don't worry - you can still access some features of
          RxCare while offline.
        </p>

        {/* Available Offline Features */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-800 mb-2">Available Offline:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• View cached prescriptions</li>
            <li>• Access medication reminders</li>
            <li>• Browse help documentation</li>
            <li>• View account settings</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleRefresh} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Link href="/dashboard">
            <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Connection Status */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">Connection will be restored automatically when available</p>
        </div>
      </div>
    </div>
  )
}

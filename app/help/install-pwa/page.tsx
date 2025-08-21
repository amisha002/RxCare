"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { ArrowLeft, Download, Smartphone, Chrome, Apple } from "lucide-react"
import Link from "next/link"

export default function InstallPwaPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/help">
              <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold font-serif text-gray-800 flex items-center">
                <Download className="w-8 h-8 mr-3 text-blue-600" />
                Install RxMind PWA
              </h1>
              <p className="text-gray-600 mt-1">
                Follow these simple steps to add RxMind as an app on your device.
              </p>
            </div>
          </div>

          {/* Desktop Instructions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
              <Chrome className="w-6 h-6 mr-2 text-blue-600" />
              For Desktop (Chrome / Edge)
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Open RxMind in your Chrome or Edge browser.</li>
              <li>Click the <strong>Install App</strong> icon in the address bar.</li>
              <li>Select <strong>Install</strong> when prompted.</li>
              <li>RxMind will now appear in your Start Menu / Desktop like a native app.</li>
            </ol>
          </div>

          {/* Android Instructions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
              <Smartphone className="w-6 h-6 mr-2 text-green-600" />
              For Android (Chrome Browser)
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Open RxMind in your Chrome browser.</li>
              <li>Tap the <strong>⋮ (three dots)</strong> menu in the top-right corner.</li>
              <li>Select <strong>“Add to Home Screen”</strong>.</li>
              <li>Tap <strong>Add</strong> to confirm. RxMind will appear on your home screen as an app.</li>
            </ol>
          </div>

          {/* iOS Instructions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
              <Apple className="w-6 h-6 mr-2 text-black" />
              For iOS (Safari Browser)
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Open RxMind in your Safari browser.</li>
              <li>Tap the <strong>Share</strong> icon <span className="text-gray-500">(square with an arrow up)</span>.</li>
              <li>Scroll down and select <strong>“Add to Home Screen”</strong>.</li>
              <li>Tap <strong>Add</strong>. RxMind will appear on your iPhone/iPad home screen.</li>
            </ol>
          </div>

          {/* Footer Note */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold">Why install the PWA?</h2>
            <p className="text-blue-100 mt-2">
              Installing RxMind as a PWA gives you faster access, offline support, and an app-like
              experience on all your devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

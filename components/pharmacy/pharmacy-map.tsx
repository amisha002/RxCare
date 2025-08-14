"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

export function PharmacyMap() {
  return (
    <Card className="border-blue-100 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Map View
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }, (_, i) => (
                <div key={i} className="border border-blue-200"></div>
              ))}
            </div>
          </div>

          {/* Location Pins */}
          <div className="absolute top-16 left-20">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
              GreenLeaf Apothecary
            </div>
          </div>

          <div className="absolute top-24 left-32">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
              CityCare Pharmacy
            </div>
          </div>

          <div className="absolute top-32 right-24">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
              Cornerstone Chemist
            </div>
          </div>

          <div className="absolute bottom-20 left-16">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
              Wellness Haven
            </div>
          </div>

          <div className="absolute bottom-16 right-20">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
              QuickMed Pharmacy
            </div>
          </div>

          {/* Your Location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
              Your Location
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
              <span className="text-lg font-bold text-gray-600">+</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
              <span className="text-lg font-bold text-gray-600">-</span>
            </button>
          </div>

          {/* Navigation Button */}
          <div className="absolute bottom-4 right-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <Navigation className="w-4 h-4" />
              <span className="text-sm font-medium">Navigate</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

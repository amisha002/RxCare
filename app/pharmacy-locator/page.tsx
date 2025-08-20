"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { PharmacyList } from "@/components/pharmacy/pharmacy-list"
import { PharmacyFilters } from "@/components/pharmacy/pharmacy-filters"
import { PharmacyMap } from "@/components/pharmacy/pharmacy-map"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, List, Map } from "lucide-react"
import Link from "next/link"

export default function PharmacyLocatorPage() {
  const [filters, setFilters] = useState({})
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold font-serif text-gray-800 flex items-center">
                    <MapPin className="w-8 h-8 mr-3 text-blue-600" />
                    Pharmacy Locator
                  </h1>
                  <p className="text-gray-600 mt-1">Find pharmacies near you</p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2 bg-white rounded-lg border border-blue-200 p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className={
                    viewMode === "map"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }
                >
                  <Map className="w-4 h-4 mr-2" />
                  Map
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <PharmacyFilters onFiltersChange={setFilters} />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {viewMode === "list" ? <PharmacyList filters={filters} /> : <PharmacyMap />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

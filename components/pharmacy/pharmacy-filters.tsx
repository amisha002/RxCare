"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Stethoscope, Filter } from "lucide-react"

interface PharmacyFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export function PharmacyFilters({ onFiltersChange }: PharmacyFiltersProps) {
  const [selectedDistance, setSelectedDistance] = useState("all")
  const [openNow, setOpenNow] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const services = [
    "Prescription Filling",
    "Vaccinations",
    "Health Screenings",
    "Medication Counseling",
    "Delivery Service",
    "24/7 Pharmacy",
  ]

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service]
    setSelectedServices(updated)
    onFiltersChange?.({
      distance: selectedDistance,
      openNow,
      services: updated,
    })
  }

  return (
    <Card className="border-blue-100">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 mr-2 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>

        <div className="space-y-6">
          {/* Distance Filter */}
          <div>
            <div className="flex items-center mb-3">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-sm font-medium text-gray-700">Distance</label>
            </div>
            <Select value={selectedDistance} onValueChange={setSelectedDistance}>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All distances</SelectItem>
                <SelectItem value="1">Within 1 km</SelectItem>
                <SelectItem value="2">Within 2 km</SelectItem>
                <SelectItem value="5">Within 5 km</SelectItem>
                <SelectItem value="10">Within 10 km</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Open Now Filter */}
          <div>
            <div className="flex items-center mb-3">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-sm font-medium text-gray-700">Availability</label>
            </div>
            <Button
              variant={openNow ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setOpenNow(!openNow)
                onFiltersChange?.({
                  distance: selectedDistance,
                  openNow: !openNow,
                  services: selectedServices,
                })
              }}
              className={
                openNow
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              }
            >
              <Clock className="w-4 h-4 mr-2" />
              Open Now
            </Button>
          </div>

          {/* Services Filter */}
          <div>
            <div className="flex items-center mb-3">
              <Stethoscope className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-sm font-medium text-gray-700">Services Offered</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Badge
                  key={service}
                  variant={selectedServices.includes(service) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedServices.includes(service)
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                  }`}
                  onClick={() => handleServiceToggle(service)}
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedDistance("all")
              setOpenNow(false)
              setSelectedServices([])
              onFiltersChange?.({
                distance: "all",
                openNow: false,
                services: [],
              })
            }}
            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

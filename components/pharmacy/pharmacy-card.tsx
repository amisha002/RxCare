"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Phone, Navigation } from "lucide-react"

interface PharmacyCardProps {
  pharmacy: {
    id: number
    name: string
    address: string
    rating: number
    distance: string
    isOpen: boolean
    phone: string
    services: string[]
    image?: string
  }
}

export function PharmacyCard({ pharmacy }: PharmacyCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <Card className="border-blue-100 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{pharmacy.name}</h3>
              {pharmacy.isOpen && <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Open</Badge>}
            </div>

            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{pharmacy.address}</span>
            </div>

            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-1">
                {renderStars(pharmacy.rating)}
                <span className="text-sm font-medium text-gray-700 ml-1">{pharmacy.rating}</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Navigation className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{pharmacy.distance}</span>
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">{pharmacy.phone}</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {pharmacy.services.slice(0, 3).map((service, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {service}
                </Badge>
              ))}
              {pharmacy.services.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  +{pharmacy.services.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {pharmacy.image && (
            <div className="w-20 h-20 bg-gray-100 rounded-lg ml-4 flex-shrink-0">
              <img
                src={pharmacy.image || "/placeholder.svg"}
                alt={pharmacy.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            View Details
          </Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
            <Navigation className="w-4 h-4 mr-2" />
            Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

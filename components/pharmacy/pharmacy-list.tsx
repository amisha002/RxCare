"use client"

import { useState } from "react"
import { PharmacyCard } from "./pharmacy-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const pharmacies = [
  {
    id: 1,
    name: "GreenLeaf Apothecary",
    address: "10 Pine Lane, Anytown, CA 90210",
    rating: 4.9,
    distance: "0.8 km",
    isOpen: true,
    phone: "+1 (555) 123-4567",
    services: ["Prescription Filling", "Vaccinations", "Health Screenings", "Delivery Service"],
    image: "/pharmacy-greenleaf.png",
  },
  {
    id: 2,
    name: "CityCare Pharmacy",
    address: "123 Main Street, Anytown, CA 90210",
    rating: 4.8,
    distance: "1.2 km",
    isOpen: true,
    phone: "+1 (555) 234-5678",
    services: ["Prescription Filling", "Medication Counseling", "24/7 Pharmacy"],
    image: "/pharmacy-citycare.png",
  },
  {
    id: 3,
    name: "Cornerstone Chemist",
    address: "56 Elm Street, Anytown, CA 90210",
    rating: 4.6,
    distance: "1.9 km",
    isOpen: true,
    phone: "+1 (555) 345-6789",
    services: ["Prescription Filling", "Vaccinations", "Health Screenings"],
    image: "/pharmacy-cornerstone.png",
  },
  {
    id: 4,
    name: "Wellness Haven Drugstore",
    address: "45 River Road, Anytown, CA 90210",
    rating: 4.5,
    distance: "2.5 km",
    isOpen: false,
    phone: "+1 (555) 456-7890",
    services: ["Prescription Filling", "Delivery Service", "Medication Counseling"],
    image: "/pharmacy-wellness.png",
  },
  {
    id: 5,
    name: "QuickMed Pharmacy",
    address: "789 Oak Avenue, Anytown, CA 90210",
    rating: 4.2,
    distance: "3.1 km",
    isOpen: true,
    phone: "+1 (555) 567-8901",
    services: ["Prescription Filling", "24/7 Pharmacy", "Delivery Service"],
    image: "/pharmacy-quickmed.png",
  },
]

interface PharmacyListProps {
  filters?: any
}

export function PharmacyList({ filters }: PharmacyListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOpenNow = !filters?.openNow || pharmacy.isOpen

    const matchesDistance =
      !filters?.distance ||
      filters.distance === "all" ||
      Number.parseFloat(pharmacy.distance) <= Number.parseFloat(filters.distance)

    const matchesServices =
      !filters?.services?.length || filters.services.some((service: string) => pharmacy.services.includes(service))

    return matchesSearch && matchesOpenNow && matchesDistance && matchesServices
  })

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for pharmacies or locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{filteredPharmacies.length} pharmacies found</h2>
        <div className="text-sm text-gray-600">Sorted by distance</div>
      </div>

      {/* Pharmacy Cards */}
      <div className="space-y-4">
        {filteredPharmacies.map((pharmacy) => (
          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
        ))}
      </div>

      {filteredPharmacies.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No pharmacies found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}

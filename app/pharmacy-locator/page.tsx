"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { PharmacyList } from "@/components/pharmacy/pharmacy-list"
import { PharmacyFilters } from "@/components/pharmacy/pharmacy-filters"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, List, Map, Navigation, Phone, Clock, Star, Search } from "lucide-react"
import Link from "next/link"

// Mock pharmacy data (you can replace this with your own database or API)
const MOCK_PHARMACIES = [
  {
    id: "1",
    name: "MedPlus Pharmacy",
    address: "123 Health Street, Medical District",
    phone: "+1-555-0123",
    rating: 4.5,
    isOpen: true,
    distance: 0.3,
    coordinates: { lat: 40.7589, lng: -73.9851 },
    services: ["24/7", "Prescription", "OTC Medicines", "Health Checkup"]
  },
  {
    id: "2", 
    name: "Apollo Pharmacy",
    address: "456 Wellness Ave, Downtown",
    phone: "+1-555-0456",
    rating: 4.2,
    isOpen: true,
    distance: 0.7,
    coordinates: { lat: 40.7614, lng: -73.9776 },
    services: ["Prescription", "OTC Medicines", "Medical Supplies"]
  },
  {
    id: "3",
    name: "Guardian Drugstore",
    address: "789 Care Boulevard, Uptown",
    phone: "+1-555-0789",
    rating: 4.0,
    isOpen: false,
    distance: 1.2,
    coordinates: { lat: 40.7505, lng: -73.9934 },
    services: ["Prescription", "OTC Medicines", "Vitamins", "Beauty Products"]
  },
  {
    id: "4",
    name: "CVS Pharmacy",
    address: "321 Medical Plaza, Central",
    phone: "+1-555-0321",
    rating: 3.8,
    isOpen: true,
    distance: 1.5,
    coordinates: { lat: 40.7549, lng: -73.9840 },
    services: ["Prescription", "OTC Medicines", "Photo Services", "MinuteClinic"]
  },
  {
    id: "5",
    name: "Walgreens",
    address: "654 Pharmacy Row, Midtown",
    phone: "+1-555-0654",
    rating: 4.1,
    isOpen: true,
    distance: 2.1,
    coordinates: { lat: 40.7505, lng: -73.9857 },
    services: ["24/7", "Prescription", "OTC Medicines", "Flu Shots"]
  }
]

// Types for pharmacy data
interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  rating: number
  isOpen: boolean
  distance: number
  coordinates: {
    lat: number
    lng: number
  }
  services: string[]
}

// Google Maps component using only JavaScript API
function PharmacyMap({ filters, searchQuery }: { filters?: any, searchQuery?: string }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(MOCK_PHARMACIES)
  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>(MOCK_PHARMACIES)
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  // Get user's current location
  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          // Default to Times Square, NY if geolocation fails
          console.warn("Geolocation error:", error)
          resolve({ lat: 40.7580, lng: -73.9855 })
        }
      )
    })
  }

  // Filter pharmacies based on search query and filters
  useEffect(() => {
    let filtered = [...pharmacies]

    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(pharmacy => 
        pharmacy.name.toLowerCase().includes(query) ||
        pharmacy.address.toLowerCase().includes(query) ||
        pharmacy.services.some(service => service.toLowerCase().includes(query))
      )
    }

    // Apply other filters
    if (filters?.openNow) {
      filtered = filtered.filter(pharmacy => pharmacy.isOpen)
    }

    if (filters?.rating) {
      filtered = filtered.filter(pharmacy => pharmacy.rating >= filters.rating)
    }

    if (filters?.maxDistance) {
      filtered = filtered.filter(pharmacy => pharmacy.distance <= filters.maxDistance)
    }

    setFilteredPharmacies(filtered)

    // Update map markers if map is loaded
    if (mapInstanceRef.current) {
      createMarkers(filtered, mapInstanceRef.current)
    }
  }, [searchQuery, filters, pharmacies])

  // Create markers for pharmacies
  const createMarkers = (pharmaciesToShow: Pharmacy[], map: google.maps.Map) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    pharmaciesToShow.forEach((pharmacy) => {
      const marker = new google.maps.Marker({
        position: { lat: pharmacy.coordinates.lat, lng: pharmacy.coordinates.lng },
        map: map,
        title: pharmacy.name,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="${pharmacy.isOpen ? '#10b981' : '#ef4444'}" stroke="white" stroke-width="2"/>
              <path d="M20 8v24M8 20h24" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20)
        }
      })

      marker.addListener('click', () => {
        setSelectedPharmacy(pharmacy)
        
        // Create info window content
        const content = `
          <div style="max-width: 300px; padding: 10px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">${pharmacy.name}</h3>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${pharmacy.address}</p>
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="color: #fbbf24; margin-right: 4px;">★</span>
              <span style="font-size: 14px; color: #374151;">${pharmacy.rating.toFixed(1)}</span>
              <span style="margin: 0 8px; color: #d1d5db;">•</span>
              <span style="font-size: 14px; color: #374151;">${pharmacy.distance.toFixed(1)} km away</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${pharmacy.isOpen ? '#10b981' : '#ef4444'}; margin-right: 6px;"></div>
              <span style="font-size: 14px; color: #374151;">${pharmacy.isOpen ? 'Open now' : 'Closed'}</span>
            </div>
            <div style="margin-bottom: 8px;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Services:</div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${pharmacy.services.map(service => 
                  `<span style="background: #eff6ff; color: #2563eb; padding: 2px 6px; border-radius: 12px; font-size: 11px;">${service}</span>`
                ).join('')}
              </div>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button onclick="getDirections(${pharmacy.coordinates.lat}, ${pharmacy.coordinates.lng})" 
                      style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; flex: 1;">
                Directions
              </button>
              <button onclick="callPharmacy('${pharmacy.phone}')" 
                      style="background: #059669; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; flex: 1;">
                Call
              </button>
            </div>
          </div>
        `

        if (infoWindowRef.current) {
          infoWindowRef.current.close()
        }

        infoWindowRef.current = new google.maps.InfoWindow({
          content: content
        })

        infoWindowRef.current.open(map, marker)
      })

      markersRef.current.push(marker)
    })
  }

  // Add user location marker
  const addUserLocationMarker = (location: { lat: number; lng: number }, map: google.maps.Map) => {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Your Location",
      icon: {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#2563eb" stroke="white" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(24, 24),
        anchor: new google.maps.Point(12, 12)
      }
    })

    markersRef.current.push(marker)
  }

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      try {
        // Get user location
        const location = await getCurrentLocation()
        setUserLocation(location)

        if (mapRef.current) {
          // Create map
          const map = new google.maps.Map(mapRef.current, {
            center: location,
            zoom: 14,
            styles: [
              {
                featureType: "poi.medical",
                elementType: "geometry.fill",
                stylers: [{ color: "#e6f3ff" }]
              },
              {
                featureType: "poi.medical",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
              }
            ],
            mapTypeControl: false,
            streetViewControl: true,
            fullscreenControl: true
          })

          mapInstanceRef.current = map

          // Add user location marker
          addUserLocationMarker(location, map)

          // Create pharmacy markers
          createMarkers(filteredPharmacies, map)

          // Add global functions for info window buttons
          ;(window as any).getDirections = (lat: number, lng: number) => {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
            window.open(url, '_blank')
          }

          ;(window as any).callPharmacy = (phone: string) => {
            window.open(`tel:${phone}`, '_self')
          }
        }
      } catch (err) {
        setError('Failed to initialize map')
      } finally {
        setLoading(false)
      }
    }

    // Load Google Maps script if not already loaded
    if (typeof google === 'undefined') {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        setError('Google Maps API key not found. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.')
        setLoading(false)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.defer = true
      script.onload = initMap
      script.onerror = () => {
        setError('Failed to load Google Maps. Please check your API key and internet connection.')
        setLoading(false)
      }
      document.head.appendChild(script)
    } else {
      initMap()
    }
  }, [])

  // Recenter map when user clicks "Find My Location"
  const recenterMap = async () => {
    try {
      const location = await getCurrentLocation()
      setUserLocation(location)
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter(location)
        mapInstanceRef.current.setZoom(14)
        
        // Clear existing markers and recreate them
        markersRef.current.forEach(marker => marker.setMap(null))
        markersRef.current = []
        
        addUserLocationMarker(location, mapInstanceRef.current)
        createMarkers(filteredPharmacies, mapInstanceRef.current)
      }
    } catch (err) {
      setError('Failed to get current location')
    }
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-red-500 mb-4">
          <MapPin className="w-12 h-12 mx-auto mb-2" />
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            onClick={recenterMap}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Find My Location</span>
          </Button>
          {loading && <span className="text-sm text-gray-500">Loading map...</span>}
          {!loading && (
            <span className="text-sm text-gray-500">
              Showing {filteredPharmacies.length} pharmacies
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">
          🟢 Open • 🔴 Closed
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div ref={mapRef} className="w-full h-96" />
        
        {loading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Pharmacy Details Panel */}
      {selectedPharmacy && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{selectedPharmacy.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{selectedPharmacy.address}</p>
              
              <div className="flex items-center space-x-4 text-sm mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{selectedPharmacy.rating.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${selectedPharmacy.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={selectedPharmacy.isOpen ? 'text-green-600' : 'text-red-600'}>
                    {selectedPharmacy.isOpen ? 'Open now' : 'Closed'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Navigation className="w-4 h-4 mr-1" />
                  <span>{selectedPharmacy.distance.toFixed(1)} km away</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Services:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedPharmacy.services.map((service, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 ml-4">
              <Button
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.coordinates.lat},${selectedPharmacy.coordinates.lng}`
                  window.open(url, '_blank')
                }}
                className="bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                Get Directions
              </Button>
              
              <Button
                onClick={() => window.open(`tel:${selectedPharmacy.phone}`, '_self')}
                variant="outline"
                size="sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Pharmacy List component
function EnhancedPharmacyList({ filters, searchQuery }: { filters: any, searchQuery: string }) {
  const [pharmacies] = useState<Pharmacy[]>(MOCK_PHARMACIES)
  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>(MOCK_PHARMACIES)

  // Filter pharmacies based on search query and filters
  useEffect(() => {
    let filtered = [...pharmacies]

    // Apply search filter
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(pharmacy => 
        pharmacy.name.toLowerCase().includes(query) ||
        pharmacy.address.toLowerCase().includes(query) ||
        pharmacy.services.some(service => service.toLowerCase().includes(query))
      )
    }

    // Apply other filters
    if (filters?.openNow) {
      filtered = filtered.filter(pharmacy => pharmacy.isOpen)
    }

    if (filters?.rating) {
      filtered = filtered.filter(pharmacy => pharmacy.rating >= filters.rating)
    }

    if (filters?.maxDistance) {
      filtered = filtered.filter(pharmacy => pharmacy.distance <= filters.maxDistance)
    }

    // Sort by distance
    filtered.sort((a, b) => a.distance - b.distance)

    setFilteredPharmacies(filtered)
  }, [searchQuery, filters, pharmacies])

  return (
    <div className="space-y-4">
      {filteredPharmacies.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No pharmacies found matching your criteria</p>
        </div>
      ) : (
        filteredPharmacies.map((pharmacy) => (
          <div key={pharmacy.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{pharmacy.name}</h3>
                <p className="text-gray-600 mb-2">{pharmacy.address}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{pharmacy.rating.toFixed(1)} rating</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${pharmacy.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>{pharmacy.isOpen ? 'Open now' : 'Closed'}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Navigation className="w-4 h-4 mr-1" />
                    <span>{pharmacy.distance.toFixed(1)} km away</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-gray-500 mb-1">Services:</div>
                  <div className="flex flex-wrap gap-1">
                    {pharmacy.services.map((service, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>{pharmacy.phone}</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <Button
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.coordinates.lat},${pharmacy.coordinates.lng}`
                    window.open(url, '_blank')
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  Get Directions
                </Button>
                
                <Button
                  onClick={() => window.open(`tel:${pharmacy.phone}`, '_self')}
                  variant="outline"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default function PharmacyLocatorPage() {
  const [filters, setFilters] = useState({})
  const [viewMode, setViewMode] = useState<"list" | "map">("map")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

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

            {/* Search Bar */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search pharmacies, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
              {viewMode === "list" ? (
                <EnhancedPharmacyList filters={filters} searchQuery={searchQuery} />
              ) : (
                <PharmacyMap filters={filters} searchQuery={searchQuery} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Calendar, User, Pill, Loader2 } from "lucide-react"

interface Medicine {
  id: number;
  medicine_name: string;
  dosage_count: number;
  timing: any;
  duration_days: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  notifications: any[];
}

interface Prescription {
  id: number;
  userId: number;
  family_member_name: string;
  prescription_image: string | null;
  created_at: string;
  updated_at: string;
  medicines: Medicine[];
  user: {
    id: number;
    email: string;
    age: number;
    phone_number: string;
  };
}

interface PrescriptionTableProps {
  prescriptions?: Prescription[];
  loading?: boolean;
}

export function PrescriptionTable({ prescriptions = [], loading = false }: PrescriptionTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Transform prescription data to match the table format
  const transformedPrescriptions = prescriptions.flatMap(prescription =>
    prescription.medicines.map(medicine => ({
      id: medicine.id,
      medication: medicine.medicine_name,
      dosage: `${medicine.dosage_count} dose(s), ${formatTiming(medicine.timing)}`,
      prescribedBy: `Dr. ${prescription.family_member_name}`, // Using family member as placeholder for doctor
      nextRefill: formatDate(medicine.end_date),
      status: getMedicineStatus(medicine),
      color: getStatusColor(getMedicineStatus(medicine)),
      familyMember: prescription.family_member_name,
      startDate: medicine.start_date,
      endDate: medicine.end_date,
    }))
  )

  const filteredPrescriptions = transformedPrescriptions.filter(
    (prescription) =>
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.familyMember.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Helper functions
  function formatTiming(timing: any): string {
    if (typeof timing === 'string') return timing
    if (Array.isArray(timing)) return timing.join(', ')
    return 'As prescribed'
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  function getMedicineStatus(medicine: Medicine): string {
    const endDate = new Date(medicine.end_date)
    const today = new Date()
    const daysUntilEnd = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilEnd < 0) return 'Expired'
    if (daysUntilEnd <= 7) return 'Due Soon'
    return 'Active'
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Due Soon':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Expired':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
            <Pill className="w-5 h-5 mr-2 text-blue-600" />
            Current Medications
          </CardTitle>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Plus className="w-4 h-4 mr-2" />
            Add New Prescription
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading prescriptions...</span>
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <Pill className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No prescriptions found</p>
            <p className="text-sm text-gray-500 mt-1">Add your first prescription to get started</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-100">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Medication</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Dosage</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Family Member</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Next Refill</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrescriptions.map((prescription) => (
                      <tr key={prescription.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-800">{prescription.medication}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{prescription.dosage}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-gray-600">
                            <User className="w-4 h-4 mr-1" />
                            {prescription.familyMember}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {prescription.nextRefill}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={prescription.color}>{prescription.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="border-blue-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{prescription.medication}</h3>
                      <Badge className={prescription.color}>{prescription.status}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Pill className="w-4 h-4 mr-2" />
                        {prescription.dosage}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {prescription.familyMember}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Next refill: {prescription.nextRefill}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

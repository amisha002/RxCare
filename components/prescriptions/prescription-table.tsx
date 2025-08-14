"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Calendar, User, Pill } from "lucide-react"

const prescriptions = [
  {
    id: 1,
    medication: "Amoxicillin",
    dosage: "500 mg, twice daily",
    prescribedBy: "Dr. Smith",
    nextRefill: "May 10, 2024",
    status: "Active",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: 2,
    medication: "Lisinopril",
    dosage: "10 mg, once daily",
    prescribedBy: "Dr. Jones",
    nextRefill: "June 1, 2024",
    status: "Active",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: 3,
    medication: "Atorvastatin",
    dosage: "20 mg, once daily",
    prescribedBy: "Dr. Patel",
    nextRefill: "May 22, 2024",
    status: "Due Soon",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    id: 4,
    medication: "Metformin",
    dosage: "1000 mg, twice daily",
    prescribedBy: "Dr. Lee",
    nextRefill: "May 28, 2024",
    status: "Active",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: 5,
    medication: "Ibuprofen",
    dosage: "200 mg, as needed",
    prescribedBy: "Dr. Garcia",
    nextRefill: "July 5, 2024",
    status: "Active",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: 6,
    medication: "Ventolin HFA",
    dosage: "2 puffs, as needed",
    prescribedBy: "Dr. Nguyen",
    nextRefill: "June 15, 2024",
    status: "Active",
    color: "bg-green-100 text-green-700 border-green-200",
  },
]

export function PrescriptionTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Medication</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Dosage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Prescribed By</th>
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
                        {prescription.prescribedBy}
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
                    {prescription.prescribedBy}
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
      </CardContent>
    </Card>
  )
}

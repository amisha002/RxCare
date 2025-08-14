"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Calendar } from "lucide-react"

const prescriptionDocuments = [
  {
    id: 1,
    name: "Amoxicillin Script",
    medication: "Amoxicillin 500mg",
    dosage: "2x daily",
    date: "April 25, 2024",
    image: "/amoxicillin-prescription.png",
  },
  {
    id: 2,
    name: "Lisinopril Prescription",
    medication: "Lisinopril 10mg",
    dosage: "1x daily",
    date: "May 1, 2024",
    image: "/prescription-lisinopril.png",
  },
  {
    id: 3,
    name: "Atorvastatin Order",
    medication: "Atorvastatin 20mg",
    dosage: "1x daily",
    date: "May 15, 2024",
    image: "/atorvastatin-prescription.png",
  },
  {
    id: 4,
    name: "Metformin Prescription",
    medication: "Metformin 1000mg",
    dosage: "2x daily",
    date: "May 20, 2024",
    image: "/metformin-prescription.png",
  },
  {
    id: 5,
    name: "Ibuprofen Dispense",
    medication: "Ibuprofen 200mg",
    dosage: "As needed",
    date: "June 20, 2024",
    image: "/ibuprofen-prescription.png",
  },
  {
    id: 6,
    name: "Ventolin Asthma",
    medication: "Ventolin HFA",
    dosage: "2 puffs as needed",
    date: "June 1, 2024",
    image: "/prescription-ventolin.png",
  },
]

export function PrescriptionDocuments() {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Prescription Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prescriptionDocuments.map((doc) => (
            <Card key={doc.id} className="border-blue-100 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-[4/3] mb-3 rounded-lg overflow-hidden bg-gray-100">
                  <img src={doc.image || "/placeholder.svg"} alt={doc.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 text-sm">{doc.name}</h3>
                  <div className="text-xs text-gray-600">
                    <div className="flex items-center mb-1">
                      <span className="font-medium">{doc.medication}</span>
                    </div>
                    <div>{doc.dosage}</div>
                  </div>

                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {doc.date}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Original
                    </Button>
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

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Calendar, FileText, Download, Eye, Plus } from "lucide-react"

interface PatientData {
  patientName: string
  dateOfBirth: string
  contactNumber: string
  patientId: string
  gender: string
  primaryPhysician: string
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    startDate: string
    endDate: string
  }>
}

interface PatientInfoDisplayProps {
  patientData: PatientData
}

export function PatientInfoDisplay({ patientData }: PatientInfoDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-serif text-gray-800">Patient Information</h2>
          <p className="text-gray-600">Extracted from prescription document</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Plus className="w-4 h-4 mr-2" />
          Set Reminder
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient Details */}
        <div className="lg:col-span-1">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Patient Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Patient Name</label>
                <p className="text-gray-800 font-medium">{patientData.patientName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                <p className="text-gray-800">{patientData.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Contact Number</label>
                <p className="text-gray-800">{patientData.contactNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Patient ID</label>
                <p className="text-gray-800 font-mono">{patientData.patientId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Gender</label>
                <p className="text-gray-800">{patientData.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Primary Physician</label>
                <p className="text-gray-800">{patientData.primaryPhysician}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prescription Document & Medications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Preview */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Prescription Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
                <div className="w-full h-48 bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Prescription document preview</p>
                    <p className="text-xs text-gray-500 mt-1">Handwritten prescription with medication details</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Original
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Prescribed Medications */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Prescribed Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-100">
                      <th className="text-left py-3 font-semibold text-gray-700">Medicine Name</th>
                      <th className="text-left py-3 font-semibold text-gray-700">Dosage</th>
                      <th className="text-left py-3 font-semibold text-gray-700">Frequency</th>
                      <th className="text-left py-3 font-semibold text-gray-700">Start Date</th>
                      <th className="text-left py-3 font-semibold text-gray-700">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData.medications.map((medication, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4">
                          <div className="font-medium text-gray-800">{medication.name}</div>
                        </td>
                        <td className="py-4 text-gray-600">{medication.dosage}</td>
                        <td className="py-4 text-gray-600">{medication.frequency}</td>
                        <td className="py-4 text-gray-600">{medication.startDate}</td>
                        <td className="py-4">
                          {medication.endDate === "Ongoing" ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200">Ongoing</Badge>
                          ) : (
                            <span className="text-gray-600">{medication.endDate}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

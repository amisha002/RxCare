"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { PatientInfoDisplay } from "@/components/upload/patient-info-display"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Sample patient data matching the reference design
const samplePatientData = {
  patientName: "Sarah Jenkins",
  dateOfBirth: "15/03/1978",
  contactNumber: "+1 (555) 123-4567",
  patientId: "P-98765",
  gender: "Female",
  primaryPhysician: "Dr. Emily Chen",
  medications: [
    {
      name: "Amoxicillin",
      dosage: "500 mg",
      frequency: "Twice daily",
      startDate: "2023-10-26",
      endDate: "2023-11-05",
    },
    {
      name: "Ibuprofen",
      dosage: "200 mg",
      frequency: "As needed",
      startDate: "2023-10-26",
      endDate: "2023-11-09",
    },
    {
      name: "Lisinopril",
      dosage: "10 mg",
      frequency: "Once daily",
      startDate: "2023-09-01",
      endDate: "Ongoing",
    },
    {
      name: "Metformin",
      dosage: "850 mg",
      frequency: "Twice daily",
      startDate: "2023-08-15",
      endDate: "Ongoing",
    },
  ],
}

export default function PatientInfoPage() {
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
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/prescriptions">
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-serif text-gray-800">Back to Patients</h1>
                <p className="text-gray-600 mt-1">Patient prescription and medical information</p>
              </div>
            </div>
          </div>

          {/* Patient Info Display */}
          <PatientInfoDisplay patientData={samplePatientData} />
        </div>
      </div>
    </div>
  )
}

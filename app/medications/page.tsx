"use client"
import React from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Pill, AlertTriangle, Sun, Sunset, Moon, Sunrise } from "lucide-react"

export default function MedicationsPage() {
  const medications = [
    { name: "Aspirin", dosage: "75mg", time: "Morning", critical: false },
    { name: "Metformin", dosage: "500mg", time: "Noon", critical: true },
    { name: "Atorvastatin", dosage: "20mg", time: "Evening", critical: false },
    { name: "Warfarin", dosage: "5mg", time: "Night", critical: true },
  ]

  const timeStyles: Record<
    string,
    { card: string; text: string; iconBg: string }
  > = {
    Morning: {
      card: "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200",
      text: "text-yellow-900",
      iconBg: "bg-yellow-200",
    },
    Noon: {
      card: "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
      text: "text-orange-900",
      iconBg: "bg-orange-200",
    },
    Evening: {
      card: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
      text: "text-purple-900",
      iconBg: "bg-purple-200",
    },
    Night: {
      card: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
      text: "text-blue-900",
      iconBg: "bg-blue-200",
    },
  }

  const timeIcons: Record<string, React.ReactNode> = {
    Morning: <Sun className="w-5 h-5" />,
    Noon: <Sunrise className="w-5 h-5" />,
    Evening: <Sunset className="w-5 h-5" />,
    Night: <Moon className="w-5 h-5" />,
  }

  return (
    <div className="flex h-screen animate-gradient">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 relative">
        {/* Soft floating background accents */}
        <div className="absolute top-20 left-40 w-60 h-60 bg-pink-200 rounded-full opacity-30 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-40 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl animate-float" />

        <h1 className="relative text-4xl font-bold text-gray-800 mb-8 flex items-center drop-shadow-sm">
          <Pill className="w-9 h-9 text-blue-600 mr-3" />
          My Medications
        </h1>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medications.map((med, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-sm border p-6 flex flex-col justify-between transition hover:scale-[1.02] hover:shadow-md ${timeStyles[med.time].card}`}
            >
              {/* Medicine Info */}
              <div>
                <div
                  className={`flex items-center mb-3 text-lg font-semibold ${timeStyles[med.time].text}`}
                >
                  <div
                    className={`w-9 h-9 ${timeStyles[med.time].iconBg} rounded-full flex items-center justify-center mr-3 shadow`}
                  >
                    {timeIcons[med.time]}
                  </div>
                  {med.name}
                </div>
                <p className="text-gray-700 font-medium mb-4">{med.dosage}</p>
              </div>

              {/* Timing Label */}
              <div
                className={`inline-block text-sm font-medium px-3 py-1 rounded-full shadow-sm ${timeStyles[med.time].iconBg} ${timeStyles[med.time].text}`}
              >
                {med.time}
              </div>

              {/* Critical Warning */}
              {med.critical && (
                <div className="mt-5 flex items-center text-red-700 bg-red-100 border border-red-300 px-4 py-3 rounded-lg text-sm font-medium shadow-sm">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Critical: Must not be missed!
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

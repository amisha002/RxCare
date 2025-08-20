"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, Pill, Activity, TrendingUp, Eye } from "lucide-react"

const reports = [
  {
    id: "P-20240715-001",
    type: "Prescription Fill",
    provider: "RxCare Pharmacy",
    date: "July 15, 2024",
    status: "completed",
    category: "prescription",
  },
  {
    id: "L-20240712-045",
    type: "Lab Report",
    provider: "Health Diagnostics Lab",
    date: "July 12, 2024",
    status: "completed",
    category: "lab",
  },
  {
    id: "P-20240708-002",
    type: "Prescription Fill",
    provider: "City Central Pharmacy",
    date: "July 08, 2024",
    status: "completed",
    category: "prescription",
  },
  {
    id: "M-20240705-010",
    type: "Medical Consultation",
    provider: "Dr. Eleanor Vance",
    date: "July 05, 2024",
    status: "completed",
    category: "consultation",
  },
  {
    id: "P-20240630-003",
    type: "Prescription Fill",
    provider: "RxCare Pharmacy",
    date: "June 30, 2024",
    status: "completed",
    category: "prescription",
  },
  {
    id: "V-20240625-022",
    type: "Vaccination Record",
    provider: "Community Health Clinic",
    date: "June 25, 2024",
    status: "completed",
    category: "vaccination",
  },
]

const adherenceData = [
  { medication: "Medication A", adherence: 95 },
  { medication: "Medication B", adherence: 87 },
  { medication: "Medication C", adherence: 92 },
  { medication: "Medication D", adherence: 78 },
]

export default function ReportsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [dateRange, setDateRange] = useState("last-month")

  const filteredReports = reports.filter((report) => {
    if (selectedFilter === "all") return true
    return report.category === selectedFilter
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "prescription":
        return <Pill className="w-4 h-4 text-blue-500" />
      case "lab":
        return <Activity className="w-4 h-4 text-green-500" />
      case "consultation":
        return <FileText className="w-4 h-4 text-purple-500" />
      case "vaccination":
        return <TrendingUp className="w-4 h-4 text-orange-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      prescription: "bg-blue-100 text-blue-800",
      lab: "bg-green-100 text-green-800",
      consultation: "bg-purple-100 text-purple-800",
      vaccination: "bg-orange-100 text-orange-800",
    }

    return (
      <Badge variant="secondary" className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reports & History</h1>
                <p className="text-gray-600 mt-1">View your medical history and download reports</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Custom Range
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>

            {/* Date Range Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "last-7-days", label: "Last 7 Days" },
                { key: "last-month", label: "Last Month" },
                { key: "custom-range", label: "Custom Range" },
              ].map((range) => (
                <Button
                  key={range.key}
                  variant={dateRange === range.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateRange(range.key)}
                  className={
                    dateRange === range.key
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-200 text-blue-700 hover:bg-blue-50"
                  }
                >
                  {range.label}
                </Button>
              ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All Reports" },
                { key: "prescription", label: "Prescriptions" },
                { key: "lab", label: "Lab Results" },
                { key: "consultation", label: "Consultations" },
                { key: "vaccination", label: "Vaccinations" },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={selectedFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.key)}
                  className={
                    selectedFilter === filter.key
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-200 text-blue-700 hover:bg-blue-50"
                  }
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Medication Adherence Chart */}
            <Card className="border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Medication Pickup Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adherenceData.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-700 truncate">{item.medication}</div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.adherence}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 w-12 text-right">{item.adherence}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="grid gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getCategoryIcon(report.category)}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{report.type}</h3>
                              <p className="text-sm text-gray-600 truncate">{report.provider}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">{getCategoryBadge(report.category)}</div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {report.date}
                              </span>
                              <span>ID: {report.id}</span>
                            </div>

                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <Card className="border-blue-200 shadow-sm">
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedFilter === "all"
                      ? "No reports available for the selected date range."
                      : `No ${selectedFilter} reports found for the selected period.`}
                  </p>
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                    Adjust Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

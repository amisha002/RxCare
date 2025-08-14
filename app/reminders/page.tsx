"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, Plus, Calendar, Pill, AlertCircle, CheckCircle2 } from "lucide-react"

const reminders = [
  {
    id: 1,
    medication: "Amoxicillin",
    dosage: "500mg",
    time: "8:00 AM",
    frequency: "Twice daily",
    nextDue: "Today, 8:00 PM",
    status: "active",
    color: "bg-blue-500",
  },
  {
    id: 2,
    medication: "Lisinopril",
    dosage: "10mg",
    time: "9:00 AM",
    frequency: "Once daily",
    nextDue: "Tomorrow, 9:00 AM",
    status: "active",
    color: "bg-green-500",
  },
  {
    id: 3,
    medication: "Vitamin D3",
    dosage: "1000 IU",
    time: "12:00 PM",
    frequency: "Once daily",
    nextDue: "Today, 12:00 PM",
    status: "overdue",
    color: "bg-orange-500",
  },
  {
    id: 4,
    medication: "Metformin",
    dosage: "850mg",
    time: "7:00 PM",
    frequency: "Twice daily",
    nextDue: "Today, 7:00 PM",
    status: "completed",
    color: "bg-purple-500",
  },
]

export default function RemindersPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredReminders = reminders.filter((reminder) => {
    if (selectedFilter === "all") return true
    return reminder.status === selectedFilter
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      default:
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Active
          </Badge>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Medication Reminders</h1>
                <p className="text-gray-600 mt-1">Manage your medication schedule and never miss a dose</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All Reminders" },
                { key: "active", label: "Active" },
                { key: "overdue", label: "Overdue" },
                { key: "completed", label: "Completed" },
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-blue-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Reminders</p>
                      <p className="text-2xl font-bold text-gray-900">{reminders.length}</p>
                    </div>
                    <Bell className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {reminders.filter((r) => r.status === "active").length}
                      </p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Overdue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {reminders.filter((r) => r.status === "overdue").length}
                      </p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completed Today</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {reminders.filter((r) => r.status === "completed").length}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reminders List */}
            <div className="grid gap-4">
              {filteredReminders.map((reminder) => (
                <Card key={reminder.id} className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div
                        className={`w-12 h-12 ${reminder.color} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Pill className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{reminder.medication}</h3>
                            <p className="text-sm text-gray-600">
                              {reminder.dosage} • {reminder.frequency}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {getStatusIcon(reminder.status)}
                            {getStatusBadge(reminder.status)}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {reminder.time}
                            </span>
                            <span>Next: {reminder.nextDue}</span>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                            >
                              Edit
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              Mark Taken
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReminders.length === 0 && (
              <Card className="border-blue-200 shadow-sm">
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No reminders found</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedFilter === "all"
                      ? "You haven't set up any medication reminders yet."
                      : `No ${selectedFilter} reminders at the moment.`}
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Reminder
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

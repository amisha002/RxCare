"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Pill } from "lucide-react"

const upcomingReminders = [
  {
    id: 1,
    medication: "Vitamin D3",
    dosage: "1 tablet",
    time: "8:00 AM",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    pillColor: "bg-orange-500",
  },
  {
    id: 2,
    medication: "Amoxicillin",
    dosage: "500 mg capsule",
    time: "1:00 PM",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    pillColor: "bg-blue-500",
  },
  {
    id: 3,
    medication: "Insulin (Humalog)",
    dosage: "10 units",
    time: "7:00 PM",
    color: "bg-green-100 text-green-700 border-green-200",
    pillColor: "bg-green-500",
  },
]

export function UpcomingReminders() {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Upcoming Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingReminders.map((reminder) => (
          <div key={reminder.id} className={`p-4 rounded-lg border ${reminder.color} transition-all hover:shadow-md`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${reminder.pillColor} rounded-full flex items-center justify-center`}>
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{reminder.medication}</h3>
                  <p className="text-sm text-gray-600">{reminder.dosage}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="bg-white/50 text-gray-700">
                  {reminder.time}
                </Badge>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          View All Reminders
        </Button>
      </CardContent>
    </Card>
  )
}

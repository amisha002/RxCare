"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const weeklyData = [
  { day: "M", percentage: 100, height: "h-16" },
  { day: "T", percentage: 85, height: "h-14" },
  { day: "W", percentage: 90, height: "h-15" },
  { day: "T", percentage: 75, height: "h-12" },
  { day: "F", percentage: 95, height: "h-15" },
  { day: "S", percentage: 80, height: "h-13" },
  { day: "S", percentage: 100, height: "h-16" },
]

export function AdherenceChart() {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Weekly Adherence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between space-x-2 h-20 mb-4">
          {weeklyData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div
                className={`w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all hover:from-blue-700 hover:to-blue-500 ${data.height}`}
                title={`${data.percentage}% adherence`}
              />
              <span className="text-xs text-gray-600 font-medium">{data.day}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">This Week</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600">Medication A</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-gray-600">Medication B</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Great job!</span> You maintained 89% adherence this week.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

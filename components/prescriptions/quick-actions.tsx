"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Download, Bell, AlertTriangle, Zap } from "lucide-react"

const quickActions = [
  {
    title: "Request Refill",
    description: "Order refills for your medications",
    icon: RefreshCw,
    color: "bg-blue-600 hover:bg-blue-700",
    count: "3 available",
  },
  {
    title: "Download History",
    description: "Get your medication history report",
    icon: Download,
    color: "bg-green-600 hover:bg-green-700",
    count: "PDF format",
  },
  {
    title: "Schedule Reminder",
    description: "Set up medication reminders",
    icon: Bell,
    color: "bg-purple-600 hover:bg-purple-700",
    count: "6 medications",
  },
  {
    title: "View Interactions",
    description: "Check drug interactions",
    icon: AlertTriangle,
    color: "bg-orange-600 hover:bg-orange-700",
    count: "Safety check",
  },
]

export function QuickActions() {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 border-blue-200 hover:bg-blue-50 bg-transparent flex flex-col items-center text-center space-y-2"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm">{action.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{action.description}</div>
                  <div className="text-xs text-blue-600 font-medium mt-1">{action.count}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Bell, FileText, Zap } from "lucide-react"

const quickActions = [
  {
    title: "Add New Prescription",
    description: "Upload or scan a new prescription",
    href: "/prescriptions/add",
    icon: Plus,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Set Reminder",
    description: "Create a medication reminder",
    href: "/reminders/add",
    icon: Bell,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "View Reports",
    description: "Check your medication history",
    href: "/reports",
    icon: FileText,
    color: "bg-purple-600 hover:bg-purple-700",
  },
]

export function QuickActions() {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 border-blue-200 hover:bg-blue-50 bg-transparent"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">{action.title}</div>
                  <div className="text-sm text-gray-600">{action.description}</div>
                </div>
              </Button>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}

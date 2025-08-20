"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { PrescriptionTable } from "@/components/prescriptions/prescription-table"
import { PrescriptionDocuments } from "@/components/prescriptions/prescription-documents"
import { QuickActions } from "@/components/prescriptions/quick-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PrescriptionsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div
    className={`flex-1 transition-all duration-300 overflow-auto ${
      !sidebarCollapsed ? 'shadow-2xl shadow-black/40 ring-1 ring-black/10' : ''
    }`}> 
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold font-serif text-gray-800">My Prescriptions</h1>
                  <p className="text-gray-600 mt-1">Manage your medications and prescriptions</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Medications</p>
                      <p className="text-2xl font-bold text-blue-600">6</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Current
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Due for Refill</p>
                      <p className="text-2xl font-bold text-orange-600">2</p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Soon
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Prescriptions</p>
                      <p className="text-2xl font-bold text-green-600">12</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Total
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Doctors</p>
                      <p className="text-2xl font-bold text-purple-600">6</p>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Prescription Table */}
            <PrescriptionTable />

            {/* Prescription Documents */}
            <PrescriptionDocuments />
          </div>
        </div>
      </div>
    </div>
  )
}

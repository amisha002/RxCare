"use client"

import { useState, useEffect } from "react"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Sidebar } from "@/components/navigation/sidebar"
import { AccountInfo } from "@/components/settings/account-info"
import { Preferences } from "@/components/settings/preferences"
import { Settings, ArrowLeft, User } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const { user: me } = useCurrentUser()
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  })

  useEffect(() => {
    if (me) {
      setUser({
        name: me.email.split("@")[0],
        email: me.email,
        phone: me.phone_number,
        age: String(me.age) + " years",
      })
    }
  }, [me])

  const [preferences, setPreferences] = useState({
    emailUpdates: true,
    smsAlerts: true,
    promotionalOffers: false,
    appointmentReminders: true,
    prescriptionReminders: true,
    healthTips: true,
    messageNotifications: true,
  })

  const handleUserUpdate = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/dashboard">
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-serif text-gray-800 flex items-center">
                  <Settings className="w-8 h-8 mr-3 text-blue-600" />
                  Account Settings
                </h1>
                <p className="text-gray-600 mt-1">Manage your account and preferences</p>
              </div>
            </div>

            {/* User Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-blue-100">{user.email}</p>
                  <p className="text-blue-200 text-sm">{user.age}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl space-y-8">
            <AccountInfo user={user} onUpdate={handleUserUpdate} />
            <Preferences preferences={preferences} onPreferenceChange={handlePreferenceChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

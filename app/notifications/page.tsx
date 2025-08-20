"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { NotificationItem } from "@/components/notifications/notification-item"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, Archive, ArrowLeft } from "lucide-react"
import Link from "next/link"

const mockNotifications = [
  {
    id: "1",
    type: "info" as const,
    title: "New Policy Update",
    message: "Important changes to our privacy policy have been published. Please review them.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    type: "appointment" as const,
    title: "Appointment Confirmed",
    message: "Your appointment with Dr. Emily White on June 25th at 10:00 AM is confirmed.",
    time: "1 day ago",
    isRead: false,
  },
  {
    id: "3",
    type: "medication" as const,
    title: "Medication Refill Due",
    message: "Your prescription for Ibuprofen 600mg is due for refill in 3 days. Contact your doctor.",
    time: "3 days ago",
    isRead: false,
  },
  {
    id: "4",
    type: "info" as const,
    title: "Lab Results Available",
    message: "New lab results are available in your patient portal. Log in to view them securely.",
    time: "1 week ago",
    isRead: true,
  },
  {
    id: "5",
    type: "message" as const,
    title: "Secure Message Received",
    message: "You have a new message from your care team regarding your recent visit.",
    time: "2 weeks ago",
    isRead: true,
  },
  {
    id: "6",
    type: "system" as const,
    title: "System Maintenance Alert",
    message: "Scheduled system maintenance on July 10th, 2 AM - 4 AM EST. Services may be briefly affected.",
    time: "3 weeks ago",
    isRead: true,
  },
  {
    id: "7",
    type: "info" as const,
    title: "Vaccination Record Update",
    message: "Your vaccination records have been updated in your profile. Review for accuracy.",
    time: "1 month ago",
    isRead: true,
  },
  {
    id: "8",
    type: "security" as const,
    title: "Unusual Activity Detected",
    message: "Suspicious login attempt detected on your account. Please review your recent activity immediately.",
    time: "1 month ago",
    isRead: true,
  },
  {
    id: "9",
    type: "success" as const,
    title: "Profile Information Complete",
    message: "Thank you for completing your profile. Your information is now up-to-date.",
    time: "2 months ago",
    isRead: true,
  },
]

// In future, replace with `/api/notifications?mine=1`

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">("all")
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "unread") return !notif.isRead
    if (activeTab === "archived") return notif.isRead
    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold font-serif text-gray-800 flex items-center">
                    <Bell className="w-8 h-8 mr-3 text-blue-600" />
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-600 mt-1">Stay updated with your health information</p>
                </div>
              </div>

              <Button
                onClick={handleMarkAllAsRead}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={unreadCount === 0}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All as Read
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white rounded-lg border border-blue-200 p-1 w-fit">
              <Button
                variant={activeTab === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("all")}
                className={
                  activeTab === "all"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }
              >
                All
              </Button>
              <Button
                variant={activeTab === "unread" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("unread")}
                className={
                  activeTab === "unread"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={activeTab === "archived" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("archived")}
                className={
                  activeTab === "archived"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }
              >
                <Archive className="w-4 h-4 mr-2" />
                Archived
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationItem key={notification.id} {...notification} onMarkAsRead={handleMarkAsRead} />
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  No {activeTab === "all" ? "" : activeTab} notifications
                </h3>
                <p className="text-gray-400">
                  {activeTab === "unread" ? "You're all caught up!" : "Check back later for updates"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

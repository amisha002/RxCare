"use client"

import { CheckCircle, AlertTriangle, Info, Shield, Calendar, Pill, MessageSquare, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationItemProps {
  id: string
  type: "info" | "success" | "warning" | "appointment" | "medication" | "message" | "system" | "security"
  title: string
  message: string
  time: string
  isRead?: boolean
  onMarkAsRead?: (id: string) => void
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "appointment":
      return <Calendar className="w-5 h-5 text-green-600" />
    case "medication":
      return <Pill className="w-5 h-5 text-blue-600" />
    case "message":
      return <MessageSquare className="w-5 h-5 text-purple-600" />
    case "system":
      return <Settings className="w-5 h-5 text-orange-600" />
    case "security":
      return <Shield className="w-5 h-5 text-red-600" />
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    default:
      return <Info className="w-5 h-5 text-blue-600" />
  }
}

export function NotificationItem({
  id,
  type,
  title,
  message,
  time,
  isRead = false,
  onMarkAsRead,
}: NotificationItemProps) {
  return (
    <div
      className={`p-4 border-l-4 ${
        isRead ? "bg-white border-l-gray-200" : "bg-blue-50 border-l-blue-500"
      } rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">{getNotificationIcon(type)}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-sm font-semibold ${isRead ? "text-gray-700" : "text-gray-900"}`}>{title}</h3>
              <p className={`text-sm mt-1 ${isRead ? "text-gray-500" : "text-gray-700"}`}>{message}</p>
              <p className="text-xs text-gray-400 mt-2">{time}</p>
            </div>

            {!isRead && onMarkAsRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(id)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 ml-2"
              >
                Mark as read
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

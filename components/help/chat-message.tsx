"use client"

import { User, Headphones } from "lucide-react"

interface ChatMessageProps {
  message: string
  time: string
  isUser?: boolean
  senderName?: string
  isOnline?: boolean
}

export function ChatMessage({ message, time, isUser = false, senderName, isOnline }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-md ${isUser ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}>
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? "bg-blue-600 ml-2" : "bg-gray-300 mr-2"
          }`}
        >
          {isUser ? <User className="w-4 h-4 text-white" /> : <Headphones className="w-4 h-4 text-gray-600" />}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col">
          {!isUser && senderName && (
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-medium text-gray-700">{senderName}</span>
              {isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            </div>
          )}

          <div
            className={`px-4 py-2 rounded-lg ${
              isUser
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"
            }`}
          >
            <p className="text-sm">{message}</p>
          </div>

          <span className={`text-xs text-gray-500 mt-1 ${isUser ? "text-right" : "text-left"}`}>{time}</span>
        </div>
      </div>
    </div>
  )
}

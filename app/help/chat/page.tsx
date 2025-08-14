"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { ChatMessage } from "@/components/help/chat-message"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, ArrowLeft, Paperclip } from "lucide-react"
import Link from "next/link"

const initialMessages = [
  {
          message: "Hello! Thank you for contacting RxCare support. How can I assist you today?",
    time: "10:00 AM",
    isUser: false,
    senderName: "Sarah M.",
    isOnline: true,
  },
  {
    message:
      "Hi there! I need help understanding my prescription details for my recent order. The dosage seems a bit unclear.",
    time: "10:01 AM",
    isUser: true,
  },
  {
    message: "Certainly, I can help with that. Could you please provide your order number or the prescription ID?",
    time: "10:02 AM",
    isUser: false,
    senderName: "Sarah M.",
    isOnline: true,
  },
  {
    message: "Yes, it's RXW-2024-54321.",
    time: "10:03 AM",
    isUser: true,
  },
  {
    message: "Thank you. Let me look that up for you. One moment, please.",
    time: "10:03 AM",
    isUser: false,
    senderName: "Sarah M.",
    isOnline: true,
  },
  {
    message:
      "Okay, I've located your prescription. It appears there was a slight error in the printed dosage instructions. The correct dosage is 2 pills, twice daily. I'm sorry for the confusion.",
    time: "10:05 AM",
    isUser: false,
    senderName: "Sarah M.",
    isOnline: true,
  },
  {
    message: "Oh, I see! That clarifies things a lot. Thank you so much, Sarah! I appreciate your quick assistance.",
    time: "10:06 AM",
    isUser: true,
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      setMessages([
        ...messages,
        {
          message: newMessage,
          time: timeString,
          isUser: true,
        },
      ])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <Link href="/help">
              <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Live Chat Support</h1>
              <p className="text-sm text-gray-600">You are connected to a support agent.</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">Sarah M.</p>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                <Paperclip className="w-4 h-4" />
              </Button>

              <div className="flex-1">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

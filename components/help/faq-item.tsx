"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface FaqItemProps {
  question: string
  answer: string
  category: string
}

export function FaqItem({ question, answer, category }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "prescriptions":
        return "bg-blue-100 text-blue-800"
      case "account":
        return "bg-green-100 text-green-800"
      case "reminders":
        return "bg-purple-100 text-purple-800"
      case "pharmacy locator":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{question}</h3>
        </div>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed pt-3">{answer}</p>
        </div>
      )}
    </div>
  )
}

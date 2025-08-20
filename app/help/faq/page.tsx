"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { FaqItem } from "@/components/help/faq-item"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft, MessageCircle, Mail, Phone } from "lucide-react"
import Link from "next/link"

const faqData = [
  {
    question: "How do I refill my prescription online?",
    answer:
      "You can refill your prescription by going to the 'My Prescriptions' section, finding your medication, and clicking the 'Request Refill' button. You'll receive a confirmation once your pharmacy processes the request.",
    category: "Prescriptions",
  },
  {
    question: "What should I do if I miss a dose of my medication?",
    answer:
      "If you miss a dose, take it as soon as you remember. However, if it's almost time for your next dose, skip the missed dose and continue with your regular schedule. Never double up on doses. Consult your healthcare provider for specific guidance.",
    category: "Reminders",
  },
  {
    question: "How can I update my personal information?",
    answer:
      "Go to Settings > Account Info and click the edit icon next to any field you want to update. You can change your name, email, phone number, and other personal details.",
    category: "Account",
  },
  {
    question: "Is it possible to track my prescription delivery?",
    answer:
      "Yes! Once your prescription is shipped, you'll receive a tracking number via email and SMS. You can also check the delivery status in the 'My Prescriptions' section.",
    category: "Prescriptions",
  },
  {
    question: "How do RxCare medication reminders work?",
    answer:
      "RxCare sends you personalized reminders based on your prescription schedule. You can customize reminder times, frequency, and delivery method (push notifications, SMS, or email) in your notification settings.",
    category: "Reminders",
  },
  {
    question: "Can I transfer my prescription from another pharmacy to RxCare?",
    answer:
      "Yes, you can transfer prescriptions from other pharmacies. Use the 'Add New Prescription' feature and select 'Transfer from Another Pharmacy'. You'll need your current pharmacy's information and prescription details.",
    category: "Prescriptions",
  },
  {
    question: "What payment methods are accepted by RxCare?",
    answer:
      "We accept major credit cards (Visa, MasterCard, American Express), debit cards, HSA/FSA cards, and most insurance plans. You can manage your payment methods in the Account Settings.",
    category: "Account",
  },
  {
    question: "How do I find pharmacies near me?",
    answer:
      "Use the Pharmacy Locator feature to find nearby pharmacies. You can filter by distance, operating hours, and services offered. The map view shows exact locations and directions.",
    category: "Pharmacy Locator",
  },
]

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const categories = ["All Categories", "Prescriptions", "Account", "Reminders", "Pharmacy Locator"]

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/help">
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-serif text-gray-800">Frequently Asked Questions</h1>
                <p className="text-gray-600 mt-1">Find answers to common questions about RxCare</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4 mb-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} category={faq.category} />
              ))
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No questions found</h3>
                <p className="text-gray-400">Try adjusting your search terms or category filter</p>
              </div>
            )}
          </div>

          {/* Still Need Help Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to assist you.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/help/chat">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>

              <Button
                variant="outline"
                className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 bg-transparent"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Sidebar } from "@/components/navigation/sidebar"
import { Button } from "@/components/ui/button"
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Wrench,
  ArrowLeft,
  Shield,
  ScrollText,
  Database,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function HelpPage() {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  // ✅ Fixed Email Assistance for RxMind
  const handleEmailSupport = () => {
    const to = "support@rxmind.com"
    const subject = encodeURIComponent("RxMind Support Request")
    const body = encodeURIComponent(
      "Hello RxMind Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you,\n[Your Name]"
    )
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`
    window.open(gmailUrl, "_blank")
  }

  const handleCallSupport = () => {
    window.open("tel:+18001234567", "_blank")
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
                  <HelpCircle className="w-8 h-8 mr-3 text-blue-600" />
                  Help & Support
                </h1>
                <p className="text-gray-600 mt-1">How can we help you today?</p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-8 shadow-md">
              <h2 className="text-xl font-semibold mb-2">Welcome to RxMind Help & Support</h2>
              <p className="text-blue-100">
                Explore our resources or connect with our team for assistance. We're here to help you manage your
                prescriptions effectively.
              </p>
            </div>
          </div>

          {/* Support Channels */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Direct Support Channels</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {/* FAQs */}
              <Link href="/help/faq">
                <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200 cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">FAQs</h3>
                  <p className="text-gray-600 text-sm">Find answers to common questions quickly.</p>
                </div>
              </Link>

              {/* Live Chat */}
              <Link href="/help/chat">
                <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200 cursor-pointer group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
                  <p className="text-gray-600 text-sm">Connect with a support agent instantly.</p>
                </div>
              </Link>

              {/* Email Assistance */}
              <div
                className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200 cursor-pointer group"
                onClick={handleEmailSupport}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Assistance</h3>
                <p className="text-gray-600 text-sm">Opens Gmail with our support email pre-filled.</p>
              </div>

              {/* Call Our Team */}
              <div
                className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200 cursor-pointer group"
                onClick={handleCallSupport}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Our Team</h3>
                <p className="text-gray-600 text-sm">Speak directly with a support specialist.</p>
              </div>
            </div>
          </div>

          {/* Quick Links & Resources */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Links & Resources</h2>

            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {/* Policies with Popups */}
              <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Policies
                </h3>
                <div className="space-y-2">
                  {/* Privacy Policy */}
                  <Dialog open={openDialog === "privacy"} onOpenChange={(open) => setOpenDialog(open ? "privacy" : null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600">
                        <Shield className="w-4 h-4 mr-2 text-blue-500" />
                        Privacy Policy
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl shadow-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-blue-600">
                          <Shield className="w-5 h-5" />
                          Privacy Policy
                        </DialogTitle>
                      </DialogHeader>
                      <div className="text-gray-700 space-y-4 leading-relaxed">
                        <p><strong>Data Collection:</strong> We collect only the information necessary to provide services.</p>
                        <p><strong>Data Protection:</strong> Your data is encrypted and safeguarded at all times.</p>
                        <p><strong>Your Control:</strong> You may edit or delete your data anytime in settings.</p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Terms of Service */}
                  <Dialog open={openDialog === "terms"} onOpenChange={(open) => setOpenDialog(open ? "terms" : null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600">
                        <ScrollText className="w-4 h-4 mr-2 text-indigo-500" />
                        Terms of Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl shadow-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-indigo-600">
                          <ScrollText className="w-5 h-5" />
                          Terms of Service
                        </DialogTitle>
                      </DialogHeader>
                      <div className="text-gray-700 space-y-4 leading-relaxed">
                        <p><strong>User Responsibility:</strong> Ensure the accuracy of your prescription data.</p>
                        <p><strong>Limitations:</strong> RxMind is a reminder tool, not medical advice.</p>
                        <p><strong>Account Use:</strong> Misuse may result in suspension.</p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Data Usage Policy */}
                  <Dialog open={openDialog === "data"} onOpenChange={(open) => setOpenDialog(open ? "data" : null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600">
                        <Database className="w-4 h-4 mr-2 text-green-500" />
                        Data Usage Policy
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl shadow-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-600">
                          <Database className="w-5 h-5" />
                          Data Usage Policy
                        </DialogTitle>
                      </DialogHeader>
                      <div className="text-gray-700 space-y-4 leading-relaxed">
                        <p><strong>Purpose:</strong> Data is used only for reminders and analytics.</p>
                        <p><strong>No Ads:</strong> We never sell or use medical data for advertising.</p>
                        <p><strong>Transparency:</strong> Anonymous insights may improve service quality.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Feedback Form */}
              <Link href="/help/feedback">
                <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200 cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                    Feedback Form
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">Share your thoughts and help us improve RxMind.</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Submit Feedback</Button>
                </div>
              </Link>

              {/* Troubleshooting Guide */}
              <Link href="/help/troubleshooting">
                <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200 cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Wrench className="w-5 h-5 mr-2 text-orange-600" />
                    Troubleshooting Guide
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">Step-by-step solutions for common issues.</p>
                  <Button
                    variant="outline"
                    className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 bg-transparent"
                  >
                    View Guide
                  </Button>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Need Assistance?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Email Support</h3>
                <p className="text-blue-600">support@rxmind.com</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Phone Support</h3>
                <p className="text-blue-600">+1 (800) 123-4567</p>
                <p className="text-sm text-gray-500">Mon-Fri: 9:00 AM - 5:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

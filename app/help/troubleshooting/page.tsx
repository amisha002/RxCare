"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 bg-yellow-100 text-yellow-700 border-yellow-300">
            Troubleshooting Guide
          </Badge>
          <h1 className="text-5xl font-bold font-serif text-gray-800 mb-6">Fix Common Issues</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Having trouble with RxMind? Here’s a quick guide to solve common issues before reaching out to support.
          </p>
        </div>

        {/* Troubleshooting Sections */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Login Issues */}
          <Card className="border-yellow-100 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">🔑 Login & Signup Problems</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 text-sm">
                <li>Ensure you’re using the correct email and password.</li>
                <li>Check if Caps Lock is on when entering your password.</li>
                <li>If you forgot your password, use the <span className="font-semibold">Forgot Password</span> option.</li>
                <li>Try clearing browser cache or using incognito mode.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Prescription Upload */}
          <Card className="border-yellow-100 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">📷 Prescription Upload Issues</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 text-sm">
                <li>Ensure your prescription image is clear and well-lit.</li>
                <li>Use JPG or PNG formats for best results.</li>
                <li>If OCR fails, try cropping the image to show only text.</li>
                <li>Re-upload after refreshing the page.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Reminders */}
          <Card className="border-yellow-100 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">⏰ Reminder Notifications Not Working</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 text-sm">
                <li>Check if notifications are allowed in your browser/app settings.</li>
                <li>Ensure battery saver mode is not restricting background activity.</li>
                <li>Re-login and set a new reminder to test.</li>
                <li>If still not working, reinstall or update the app.</li>
              </ul>
            </CardContent>
          </Card>

          {/* General Fixes */}
          <Card className="border-yellow-100 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">⚙️ General Fixes</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 text-sm">
                <li>Always keep the app updated to the latest version.</li>
                <li>Try logging out and back in if data doesn’t sync.</li>
                <li>Clear cache/cookies for smoother performance.</li>
                <li>Restart your device if unexpected errors occur.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Contact Support */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
          <p className="text-lg text-gray-600 mb-6">
            If none of the above solutions worked, our support team is here for you.
          </p>
          <a
            href="/help/chat"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            💬 Contact Support
          </a>
        </section>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url(/Bgimg.jpg)",
          backgroundPosition: "center 20%",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
        style={{
          backgroundImage: "url(/Bgimg.jpg)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "scroll",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/40 to-blue-100/50 backdrop-blur-[1px]" />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
              <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
                Giving your prescriptions, the wings of reminders
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                Never Miss a Dose Again.
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Seamlessly manage your medications, set personalized reminders, and track your health with RxMind - your
                trusted partner in well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg animate-pulse-blue"
                  >
                    Get Started
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg bg-white/80"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative max-w-sm mx-auto animate-float">
              <div className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-3xl p-2 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">10:00 AM</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">100%</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm">AMOXICILLIN</h3>
                        <p className="text-xs text-gray-600">Take one capsule with water</p>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          <span className="text-xs text-green-600 font-medium">On time</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">Vitamin D3</p>
                          <p className="text-xs text-gray-500">1:00 PM</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">Insulin</p>
                          <p className="text-xs text-gray-500">7:00 PM</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-serif mb-4 text-gray-800">Everything you need to stay healthy</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive medication management tools designed for your peace of mind
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-blue-100 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Easy Reminders</h3>
                  <p className="text-gray-600 leading-relaxed text-sm break-words">
                    Set dose times & refill alerts, customize schedules, and get timely notifications so you never
                    forget.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-100 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Track Prescriptions</h3>
                  <p className="text-gray-600 leading-relaxed text-sm break-words">
                    Maintain a comprehensive dosage history, monitor adherence patterns, and share reports with your
                    doctor.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-100 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Pharmacy Near You</h3>
                  <p className="text-gray-600 leading-relaxed text-sm break-words">
                    Quickly locate nearby pharmacies, compare prices, and manage your prescription refills on the go.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold font-serif mb-6 text-white">Ready to take control of your health?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust RxMind to manage their medications safely and effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  Get Started Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-white hover:bg-blue-600 px-8 py-4 text-lg bg-transparent"
              >
                Need help? Chat with Support
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">RX</span>
                  </div>
                  <span className="text-xl font-bold font-serif text-gray-800">RxMind</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Your trusted partner in medication management and health tracking.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="/help" className="hover:text-blue-600">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="#" className="hover:text-blue-600">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <Link href="#" className="hover:text-blue-600">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="hover:text-blue-600">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-600">
                Emergency Contact: +1 (800) 123-4567 | © 2025 RxMind. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Camera, Plus } from "lucide-react"
import Link from "next/link"

export default function AddPrescriptionPage() {
  const [step, setStep] = useState(1)

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
              <Link href="/prescriptions">
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-serif text-gray-800">Add New Prescription</h1>
                <p className="text-gray-600 mt-1">Upload or manually enter prescription details</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-6">
              <div className={`flex items-center space-x-2 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  1
                </div>
                <span className="text-sm font-medium">Choose Method</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  2
                </div>
                <span className="text-sm font-medium">Capture/Upload</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className={`flex items-center space-x-2 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  3
                </div>
                <span className="text-sm font-medium">Review & Save</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl text-center">Choose your upload method</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Upload Document */}
                    <Card
                      className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setStep(2)}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
                        <p className="text-gray-600 mb-4">
                          Effortlessly upload digital copies of your prescriptions directly from your device.
                        </p>
                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50">
                          <p className="text-sm text-blue-600">Drag & drop your files here or click to upload</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Scan with Camera */}
                    <Card
                      className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setStep(2)}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Scan with Camera</h3>
                        <p className="text-gray-600 mb-4">
                          Use your device's camera to capture a new photo of your physical prescription.
                        </p>
                        <div className="bg-gray-100 rounded-lg p-6">
                          <div className="w-24 h-24 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">QR Code for mobile scanning</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Scan Tips */}
                  <Card className="mt-8 border-blue-100">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Scan Tips</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p>Ensure good, even lighting to avoid shadows.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p>Place the prescription on a flat, contrasting surface.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p>Focus clearly on all text for accurate extraction.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p>Capture the entire document without cropping key information.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>Manual Entry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="medication">Medication Name</Label>
                      <Input id="medication" placeholder="e.g., Amoxicillin" className="border-blue-200" />
                    </div>
                    <div>
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input id="dosage" placeholder="e.g., 500mg" className="border-blue-200" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select>
                        <SelectTrigger className="border-blue-200">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once">Once daily</SelectItem>
                          <SelectItem value="twice">Twice daily</SelectItem>
                          <SelectItem value="three">Three times daily</SelectItem>
                          <SelectItem value="asneeded">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="doctor">Prescribed By</Label>
                      <Input id="doctor" placeholder="e.g., Dr. Smith" className="border-blue-200" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special instructions for taking this medication..."
                      className="border-blue-200"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="border-blue-200 bg-transparent">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="bg-gradient-to-r from-blue-600 to-blue-700">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle>Review & Confirm</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Prescription Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Medication:</span>
                        <span className="font-medium">Amoxicillin</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dosage:</span>
                        <span className="font-medium">500mg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium">Twice daily</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Prescribed By:</span>
                        <span className="font-medium">Dr. Smith</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="border-blue-200 bg-transparent">
                      Back
                    </Button>
                    <Link href="/prescriptions" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Prescription
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

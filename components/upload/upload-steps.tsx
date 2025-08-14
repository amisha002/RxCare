"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, FileText, Check, ArrowLeft, ArrowRight } from "lucide-react"

interface UploadStepsProps {
  onComplete?: () => void
}

export function UploadSteps({ onComplete }: UploadStepsProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedMethod, setSelectedMethod] = useState<"upload" | "scan" | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [extractedData, setExtractedData] = useState<any>(null)

  const steps = [
    { number: 1, title: "Choose Method", icon: FileText },
    { number: 2, title: "Capture/Upload", icon: Upload },
    { number: 3, title: "Extract & Review", icon: FileText },
    { number: 4, title: "Confirm & Save", icon: Check },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Simulate extraction process
      setTimeout(() => {
        setExtractedData({
          patientName: "Sarah Jenkins",
          dateOfBirth: "15/03/1978",
          contactNumber: "+1 (555) 123-4567",
          patientId: "P-98765",
          gender: "Female",
          primaryPhysician: "Dr. Emily Chen",
          medications: [
            {
              name: "Amoxicillin",
              dosage: "500 mg",
              frequency: "Twice daily",
              startDate: "2023-10-26",
              endDate: "2023-11-05",
            },
            {
              name: "Ibuprofen",
              dosage: "200 mg",
              frequency: "As needed",
              startDate: "2023-10-26",
              endDate: "2023-11-09",
            },
          ],
        })
        setCurrentStep(3)
      }, 2000)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setUploadedFile(files[0])
      // Simulate extraction
      setTimeout(() => {
        setExtractedData({
          patientName: "Sarah Jenkins",
          dateOfBirth: "15/03/1978",
          contactNumber: "+1 (555) 123-4567",
          patientId: "P-98765",
          gender: "Female",
          primaryPhysician: "Dr. Emily Chen",
          medications: [
            {
              name: "Amoxicillin",
              dosage: "500 mg",
              frequency: "Twice daily",
              startDate: "2023-10-26",
              endDate: "2023-11-05",
            },
          ],
        })
        setCurrentStep(3)
      }, 2000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = currentStep === step.number
          const isCompleted = currentStep > step.number

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                    {step.title}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && <div className="w-12 h-px bg-gray-300 mx-4"></div>}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <Card className="border-blue-100">
        <CardContent className="p-8">
          {/* Step 1: Choose Method */}
          {currentStep === 1 && (
            <div>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Choose your upload method</CardTitle>
              </CardHeader>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Upload Document */}
                <Card
                  className={`border-2 cursor-pointer transition-all ${
                    selectedMethod === "upload"
                      ? "border-blue-500 bg-blue-50"
                      : "border-blue-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => {
                    setSelectedMethod("upload")
                    setCurrentStep(2)
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
                    <p className="text-gray-600 text-sm">
                      Effortlessly upload digital copies of your prescriptions directly from your device.
                    </p>
                  </CardContent>
                </Card>

                {/* Scan with Camera */}
                <Card
                  className={`border-2 cursor-pointer transition-all ${
                    selectedMethod === "scan"
                      ? "border-blue-500 bg-blue-50"
                      : "border-blue-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => {
                    setSelectedMethod("scan")
                    setCurrentStep(2)
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Scan with Camera</h3>
                    <p className="text-gray-600 text-sm">
                      Use your device's camera to capture a new photo of your physical prescription.
                    </p>
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <div className="w-20 h-20 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-600">QR</span>
                      </div>
                      <p className="text-xs text-gray-600">Scan QR Code</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Scan Tips */}
              <Card className="border-blue-100 bg-blue-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4 text-blue-800">Scan Tips</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-blue-700">Ensure good, even lighting to avoid shadows.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-blue-700">Place the prescription on a flat, contrasting surface.</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-blue-700">Focus clearly on all text for accurate extraction.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-blue-700">
                          Capture the entire document without cropping key information.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Note */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Privacy Note</h5>
                <p className="text-sm text-green-700">
                  Your prescription data is encrypted and securely stored. We prioritize your privacy and compliance
                  with all health data regulations.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Upload/Capture */}
          {currentStep === 2 && (
            <div>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">
                  {selectedMethod === "upload" ? "Upload Your Document" : "Scan Your Prescription"}
                </CardTitle>
              </CardHeader>

              {selectedMethod === "upload" && (
                <div>
                  <div
                    className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                      Drag & drop your files here or click to upload
                    </h3>
                    <p className="text-blue-600 mb-4">Supports PDF, JPG, PNG files up to 10MB</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Browse Files</Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === "scan" && (
                <div className="text-center">
                  <div className="w-64 h-48 bg-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">Position your prescription in the camera frame</p>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCurrentStep(3)}>
                    Capture Photo
                  </Button>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="border-blue-200 bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Extract & Review */}
          {currentStep === 3 && extractedData && (
            <div>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Review Extracted Information</CardTitle>
                <p className="text-gray-600">Please verify the extracted data is correct</p>
              </CardHeader>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Document Preview */}
                <div>
                  <h3 className="font-semibold mb-4">Prescription Document</h3>
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600">Document successfully processed</p>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="border-blue-200 bg-transparent">
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-200 bg-transparent">
                        View Original
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Extracted Data */}
                <div>
                  <h3 className="font-semibold mb-4">Patient Information</h3>
                  <Card className="border-blue-100">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Patient Name:</span>
                        <span className="font-medium">{extractedData.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-medium">{extractedData.dateOfBirth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact:</span>
                        <span className="font-medium">{extractedData.contactNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Patient ID:</span>
                        <span className="font-medium">{extractedData.patientId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Primary Physician:</span>
                        <span className="font-medium">{extractedData.primaryPhysician}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <h4 className="font-semibold mt-6 mb-4">Prescribed Medications</h4>
                  <div className="space-y-3">
                    {extractedData.medications.map((med: any, index: number) => (
                      <Card key={index} className="border-blue-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold">{med.name}</h5>
                            <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Dosage: {med.dosage}</div>
                            <div>Frequency: {med.frequency}</div>
                            <div>
                              Duration: {med.startDate} to {med.endDate}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="border-blue-200 bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(4)} className="bg-blue-600 hover:bg-blue-700">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm & Save */}
          {currentStep === 4 && (
            <div>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Confirm & Save</CardTitle>
                <p className="text-gray-600">Your prescription has been successfully processed</p>
              </CardHeader>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>

                <h3 className="text-xl font-semibold mb-4">Prescription Added Successfully!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your prescription has been added to your account and reminders have been set up automatically.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={onComplete}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    View My Prescriptions
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep(1)
                      setSelectedMethod(null)
                      setUploadedFile(null)
                      setExtractedData(null)
                    }}
                    className="border-blue-200 bg-transparent"
                  >
                    Add Another Prescription
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/navigation/sidebar"
import { UploadSteps } from "@/components/upload/upload-steps"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const router = useRouter()

  const handleUploadComplete = () => {
    router.push("/prescriptions")
  }

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
              <Link href="/dashboard">
                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-serif text-gray-800">Upload / Scan Prescription</h1>
                <p className="text-gray-600 mt-1">Multi-step process to add your prescription</p>
              </div>
            </div>
          </div>

          {/* Upload Steps Component */}
          <UploadSteps onComplete={handleUploadComplete} />
        </div>
      </div>
    </div>
  )
}

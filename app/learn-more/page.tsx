"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            Why RxMind Matters
          </Badge>
          <h1 className="text-5xl font-bold font-serif text-gray-800 mb-6">
            The Global Problem of Medication Non-Adherence
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Medication non-adherence is one of the biggest challenges in healthcare today. Patients not following their
            prescriptions leads to millions of preventable deaths, hospitalizations, and economic losses worldwide. RxMind is
            designed to solve this.
          </p>
        </div>

        {/* Global Stats */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Facts & Statistics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-blue-100 shadow-md">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-gray-700">Global & U.S. Impact</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>50% of chronic patients in developed countries don’t follow prescriptions (WHO).</li>
                  <li>125,000 deaths annually in the U.S. due to non-adherence.</li>
                  <li>25% of U.S. hospital admissions are caused by non-compliance.</li>
                  <li>$100–300 billion avoidable healthcare costs each year in the U.S. alone.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-md">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-gray-700">India & LMIC Context</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Adherence rates are much lower than global average.</li>
                  <li>45% of prescriptions from major hospitals in India are incomplete or deviate from guidelines.</li>
                  <li>Non-adherence worsens out-of-pocket expenses and emergency visits.</li>
                  <li>LMICs bear 80% of NCD-related deaths worldwide.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why It Matters */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why It Matters</h2>
          <p className="text-gray-600 mb-6">
            Non-adherence leads to worsening of chronic conditions, unnecessary hospitalizations, preventable deaths, and a
            massive financial burden on patients and healthcare systems. This directly aligns with{" "}
            <span className="font-semibold">UN Sustainable Development Goal (SDG) 3: Good Health & Well-being</span>.
          </p>
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <p className="text-gray-700">
                ✅ Addressing medication adherence is crucial to achieving health equity, improving patient outcomes, and
                reducing the financial strain on families and healthcare infrastructure.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Solution */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How RxMind Solves This</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-blue-100 shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">📱 Smart Reminders</h3>
                <p className="text-gray-600 text-sm">
                  Automated notifications & voice assistant alerts prevent forgetfulness, ensuring doses are never missed.
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-100 shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">📝 Prescription Upload + OCR</h3>
                <p className="text-gray-600 text-sm">
                  Patients can scan and upload prescriptions. Our OCR extracts medicine details to avoid confusion and
                  incomplete guidance.
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-100 shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">👨‍👩‍👦 Caregiver Support</h3>
                <p className="text-gray-600 text-sm">
                  Family members get notified when a dose is missed, improving monitoring and emotional support for patients.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Closing */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            RxMind empowers patients to stay consistent with their treatments, reduces preventable hospital visits, and
            supports caregivers—helping create a healthier, more sustainable future.
          </p>
        </section>
      </div>
    </div>
  )
}

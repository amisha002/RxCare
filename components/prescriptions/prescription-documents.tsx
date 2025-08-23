"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Calendar, Loader2 } from "lucide-react"

interface Medicine {
  id: number;
  medicine_name: string;
  dosage_count: number;
  timing: any;
  duration_days: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  notifications: any[];
}

interface Prescription {
  id: number;
  userId: number;
  family_member_name: string;
  prescription_image: string | null;
  created_at: string;
  updated_at: string;
  medicines: Medicine[];
  user: {
    id: number;
    email: string;
    age: number;
    phone_number: string;
  };
}

interface PrescriptionDocumentsProps {
  prescriptions?: Prescription[];
  loading?: boolean;
}

export function PrescriptionDocuments({ prescriptions = [], loading = false }: PrescriptionDocumentsProps) {
  // Transform prescription data to document format
  const prescriptionDocuments = prescriptions.map(prescription => ({
    id: prescription.id,
    name: `${prescription.family_member_name}'s Prescription`,
    medication: prescription.medicines.map(m => m.medicine_name).join(', '),
    dosage: prescription.medicines.map(m => `${m.dosage_count} dose(s)`).join(', '),
    date: new Date(prescription.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    image: prescription.prescription_image || "/placeholder.svg",
    familyMember: prescription.family_member_name,
    medicines: prescription.medicines,
  }));

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Prescription Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading documents...</span>
          </div>
        ) : prescriptionDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No prescription documents found</p>
            <p className="text-sm text-gray-500 mt-1">Upload prescription images to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prescriptionDocuments.map((doc) => (
              <Card key={doc.id} className="border-blue-100 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-[4/3] mb-3 rounded-lg overflow-hidden bg-gray-100">
                    <img src={doc.image || "/placeholder.svg"} alt={doc.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 text-sm">{doc.name}</h3>
                    <div className="text-xs text-gray-600">
                      <div className="flex items-center mb-1">
                        <span className="font-medium">{doc.medication}</span>
                      </div>
                      <div>{doc.dosage}</div>
                      <div className="text-blue-600 font-medium">{doc.familyMember}</div>
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {doc.date}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Original
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Save, X } from "lucide-react"

interface AccountInfoProps {
  user: {
    name: string
    email: string
    phone: string
    age: string
  }
  onUpdate: (field: string, value: string) => void
}

export function AccountInfo({ user, onUpdate }: AccountInfoProps) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState("")

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field)
    setTempValue(currentValue)
  }

  const handleSave = (field: string) => {
    onUpdate(field, tempValue)
    setEditingField(null)
    setTempValue("")
  }

  const handleCancel = () => {
    setEditingField(null)
    setTempValue("")
  }

  const renderField = (field: string, label: string, value: string) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        {editingField === field ? (
          <Input value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="mt-1" autoFocus />
        ) : (
          <p className="text-gray-900 mt-1">{value}</p>
        )}
      </div>

      <div className="ml-4 flex space-x-2">
        {editingField === field ? (
          <>
            <Button size="sm" onClick={() => handleSave(field)} className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(field, value)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Info</h2>

      <div className="space-y-4">
        {renderField("name", "Name", user.name)}
        {renderField("email", "Email", user.email)}
        {renderField("phone", "Phone", user.phone)}
      </div>
    </div>
  )
}

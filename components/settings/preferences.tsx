import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, Key, FileText, Trash2 } from "lucide-react"

interface PreferencesProps {
  preferences: {
    emailUpdates: boolean
    smsAlerts: boolean
    promotionalOffers: boolean
    appointmentReminders: boolean
    prescriptionReminders: boolean
    healthTips: boolean
    messageNotifications: boolean
  }
  onPreferenceChange: (key: string, value: boolean) => void
}

export function Preferences({ preferences, onPreferenceChange }: PreferencesProps) {
  const renderToggle = (key: string, label: string, description: string) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <Switch
        checked={preferences[key as keyof typeof preferences]}
        onCheckedChange={(checked) => onPreferenceChange(key, checked)}
        className="data-[state=checked]:bg-blue-600"
      />
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Contact Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Preferences</h2>

        <div className="space-y-4">
          {renderToggle("emailUpdates", "Email Updates", "Receive important notifications and updates via email.")}
          {renderToggle("smsAlerts", "SMS Alerts", "Get critical alerts and reminders on your phone.")}
          {renderToggle("promotionalOffers", "Promotional Offers", "Stay informed about exclusive deals and services.")}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Settings</h2>

        <div className="space-y-4">
          {renderToggle("appointmentReminders", "Appointment Reminders", "Notify me about upcoming appointments.")}
          {renderToggle(
            "prescriptionReminders",
            "Prescription Refill Reminders",
            "Alert me when it's time to refill my prescriptions.",
          )}
          {renderToggle("healthTips", "Health Tips & News", "Receive personalized health advice and news.")}
          {renderToggle(
            "messageNotifications",
            "New Message Notifications",
            "Get notified for new messages from your providers.",
          )}
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacy & Security</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-blue-600" />
              <div>
                <Label className="text-sm font-medium text-gray-700">Change Password</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Update your account password regularly for better security.
                </p>
              </div>
            </div>
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <Label className="text-sm font-medium text-gray-700">Two-Factor Authentication (2FA)</Label>
                <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent">
              Setup 2FA
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <Label className="text-sm font-medium text-gray-700">Data & Privacy Policy</Label>
                <p className="text-sm text-gray-500 mt-1">Review how your personal data is collected and used.</p>
              </div>
            </div>
            <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50 bg-transparent">
              View Policy
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-5 h-5 text-red-600" />
              <div>
                <Label className="text-sm font-medium text-red-700">Delete Account</Label>
                <p className="text-sm text-red-500 mt-1">
                  Permanently delete your RxCare account and all associated data.
                </p>
              </div>
            </div>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-100 bg-transparent">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

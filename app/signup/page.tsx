"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState(0)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [caregiverPhone, setCaregiverPhone] = useState("")
  const [needsCaregiver, setNeedsCaregiver] = useState(false)
  const [familyMembers, setFamilyMembers] = useState([{ name: "", relation: "" }])

  const passwordsMatch = password === confirmPassword
  const showPasswordError = confirmPassword.length > 0 && !passwordsMatch

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: "", relation: "" }])
  }

  const removeFamilyMember = (index: number) => {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter((_, i) => i !== index))
    }
  }

  const updateFamilyMember = (index: number, field: "name" | "relation", value: string) => {
    const updated = familyMembers.map((member, i) => (i === index ? { ...member, [field]: value } : member))
    setFamilyMembers(updated)
  }

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const value = input.value.replace(/[^0-9]/g, "") 
    input.value = value
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordsMatch) {
      alert("Passwords do not match. Please check your password confirmation.")
      return
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.")
      return
    }

    // Build request body
    const requestBody = {
      email,
      password,
      age,
      phone_number: phoneNumber,
      caregiver_phone: needsCaregiver ? caregiverPhone : null,
      family_members: familyMembers,
    }

    try {
      const res = await fetch(`${apiUrl}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Registration failed")
        return
      }

      alert("Registration successful!")
      console.log("Registered user:", data)
      window.location.href = '/login'
    } catch (err) {
      console.error("Error:", err)
      alert("Something went wrong. Please try again later.")
    }
  }

  return (
    <>
      <div
        className="hidden md:block fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/Bgimg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="md:hidden fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/Bgimg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      />
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-white/30 via-blue-50/40 to-white/30 backdrop-blur-sm" />
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-start">
          <Card className="w-full max-w-2xl mx-auto border-blue-100 shadow-xl bg-white">
            <CardHeader className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">RX</span>
                </div>
                <span className="text-2xl font-bold font-serif bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  RxMind
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Create Your Account</CardTitle>
              <CardDescription className="text-gray-600">
                Join RxMind to manage your prescriptions and connect with your care network.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />

                </div>


                <div className="space-y-2">
                  <Label htmlFor="age" className="text-gray-700">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type=""
                    placeholder="How old are you?"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onInput={handlePhoneInput}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password (min 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                    minLength={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`border-blue-200 focus:border-blue-500 focus:ring-blue-500 ${showPasswordError ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    required
                  />
                  {showPasswordError && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span>
                      Passwords do not match
                    </p>
                  )}
                  {confirmPassword.length > 0 && passwordsMatch && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <span>✓</span>
                      Passwords match
                    </p>
                  )}
                </div>

                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="needsCaregiver"
                      checked={needsCaregiver}
                      onCheckedChange={(checked) => setNeedsCaregiver(checked as boolean)}
                    />
                    <Label htmlFor="needsCaregiver" className="text-gray-700">
                      I need caregiver assistance
                    </Label>
                  </div>

                  {needsCaregiver && (
                    <div className="space-y-2">
                      <Label htmlFor="caregiverPhone" className="text-gray-700">
                        Caregiver Phone Number
                      </Label>
                      <Input
                        id="caregiverPhone"
                        type="tel"
                        placeholder="Enter caregiver's phone number"
                        value={caregiverPhone}
                        onChange={(e) => setCaregiverPhone(e.target.value)}
                        onInput={handlePhoneInput}
                        className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700 font-medium">Family Members</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFamilyMember}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      + Add Member
                    </Button>
                  </div>

                  {familyMembers.map((member, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-sm text-gray-600">Name</Label>
                        <Input
                          placeholder="Family member name"
                          value={member.name}
                          onChange={(e) => updateFamilyMember(index, "name", e.target.value)}
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm text-gray-600">Relation</Label>
                        <Select
                          value={member.relation}
                          onValueChange={(value) => updateFamilyMember(index, "relation", value)}
                        >
                          <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Select relation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="grandparent">Grandparent</SelectItem>
                            <SelectItem value="grandchild">Grandchild</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        {familyMembers.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFamilyMember(index)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  disabled={!passwordsMatch || password.length < 8}
                >
                  Create Account
                </Button>
              </form>

              <div className="text-center">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="hidden lg:flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-3xl p-3 shadow-2xl animate-float">
                <div className="bg-white rounded-2xl p-6 w-64">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-500">Reminder</span>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">💊</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">Medicine Time!</h3>
                        <p className="text-sm text-gray-600">Take your daily vitamin</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                        Take Now
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs border-blue-200 bg-transparent">
                        Remind Later
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Set reminders in seconds.</h3>
              <p className="text-gray-600 max-w-sm">
                Never miss a dose with our intelligent reminder system that adapts to your schedule.
              </p>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

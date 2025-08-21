"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Button } from "@/components/ui/button"
import { Menu, X, User, UserPlus, Home, Pill, Calendar, Settings } from "lucide-react"
import LogoutButton from "./logoutButton/page"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useCurrentUser()
  //const isAuthed = !!user
  const isAuthed = true
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-gray-900 shadow-sm border-b border-gray-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Pill className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl text-white font-poppins">RxMind</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-1 text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href={isAuthed ? "/prescriptions" : "/login"}
                className="flex items-center space-x-1 text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Pill className="h-4 w-4" />
                <span>Medications</span>
              </Link>
              <Link
                href={isAuthed ? "/reminders" : "/login"}
                className="flex items-center space-x-1 text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Reminders</span>
              </Link>
              <Link
                href={isAuthed ? "/profile" : "/login"}
                className="flex items-center space-x-1 text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthed ? (
              <LogoutButton/>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-white hover:text-blue-400 hover:bg-gray-800" asChild>
                  <Link href="/login" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/signup" className="flex items-center space-x-1">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-600">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white hover:text-blue-400 hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href={isAuthed ? "/prescriptions" : "/login"}
              className="flex items-center space-x-2 text-white hover:text-blue-400 hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Pill className="h-5 w-5" />
              <span>Medications</span>
            </Link>
            <Link
              href={isAuthed ? "/reminders" : "/login"}
              className="flex items-center space-x-2 text-white hover:text-blue-400 hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="h-5 w-5" />
              <span>Reminders</span>
            </Link>
            <Link
              href={isAuthed ? "/settings" : "/login"}
              className="flex items-center space-x-2 text-white hover:text-blue-400 hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-5 w-5" />
              <span>Profile</span>
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-600">
              <div className="flex items-center px-3 space-x-3">
                {isAuthed ? (
                  <LogoutButton/>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-white hover:text-blue-400 hover:bg-gray-800"
                      asChild
                    >
                      <Link
                        href="/login"
                        className="flex items-center justify-center space-x-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link
                        href="/signup"
                        className="flex items-center justify-center space-x-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

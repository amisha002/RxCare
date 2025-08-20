"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Pill, Bell, MapPin, FileText, HelpCircle, Settings, LogOut, ChevronLeft, ChevronRight, Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Prescriptions",
    href: "/prescriptions",
    icon: Pill,
  },
  {
    title: "Reminders",
    href: "/reminders",
    icon: Bell,
  },
  {
    title: "Pharmacy Locator",
    href: "/pharmacy-locator",
    icon: MapPin,
  },
  {
    title: "Reports & History",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  className?: string
}

import { useCurrentUser } from "@/hooks/useCurrentUser"

export function Sidebar({ collapsed = false, onToggle, className }: SidebarProps) {
  const { user } = useCurrentUser()
  const pathname = usePathname()

  return (
    <>
      {/* Floating Toggle Button - Only visible when sidebar is collapsed */}
      {collapsed && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <div
        className={cn(
          "flex flex-col h-full bg-gradient-to-b from-blue-600 to-blue-700 border-r border-blue-500 transition-all duration-300 ease-in-out shadow-xl",
          collapsed ? "w-0 overflow-hidden" : "w-64",
          className,
        )}
      >
        {/* Logo & Toggle */}
        <div className={cn("flex items-center justify-between p-4 border-b border-blue-500/30", collapsed ? "flex-col space-y-2" : "")}>
          <Link href="/dashboard" className="flex items-center justify-start group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative group-hover:scale-110 transition-transform duration-200">
                <Image src="/rxwings-logo.png" alt="RxCare Logo" fill className="object-contain" />
              </div>
              {!collapsed && <span className="text-white font-bold text-xl group-hover:text-blue-100 transition-colors duration-200">RxMind</span>}
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "ml-auto hover:bg-white/20 transition-all duration-200 hover:scale-105",
              collapsed ? "mt-2" : ""
            )}
            onClick={onToggle}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="w-5 h-5 text-white" /> : <ChevronLeft className="w-5 h-5 text-white" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                    isActive
                      ? "bg-white/20 text-white border border-white/30 shadow-lg backdrop-blur-sm"
                      : "text-blue-100 hover:bg-white/15 hover:text-white hover:shadow-md",
                    collapsed && "justify-center px-2 space-x-0"
                  )}
                >
                  <Icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-2 border-t border-blue-500/30">
          <div className={cn("flex items-center space-x-3 mb-4", collapsed && "justify-center space-x-0")}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors duration-200 cursor-pointer">
              <span className="text-white font-semibold text-sm">{(user?.email || "U").slice(0,1).toUpperCase()}</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.email || "Not logged in"}</p>
                <p className="text-xs text-blue-200 truncate">{user ? "View settings" : "Login required"}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="space-y-2">
              <Link href="/settings">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-white/15 border-0 transition-all duration-200 hover:scale-105"
                >
                  <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Settings</span>
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-blue-100 hover:text-red-200 hover:bg-red-500/20 border-0 transition-all duration-200 hover:scale-105"
                >
                  <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Logout</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Pill, Bell, MapPin, FileText, HelpCircle, Settings, LogOut } from "lucide-react"
import Image from "next/image"

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
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-blue-600 to-blue-700 border-r border-blue-500",
        className,
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-blue-500/30">
        <Link href="/dashboard" className="flex items-center justify-start">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <Image src="/rxwings-logo.png" alt="RxCare Logo" fill className="object-contain" />
            </div>
            <span className="text-white font-bold text-xl">RxCare</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/20 text-white border border-white/30 shadow-lg"
                    : "text-blue-100 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-blue-500/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">AJ</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Alex Johnson</p>
            <p className="text-xs text-blue-200 truncate">alex@example.com</p>
          </div>
        </div>

        <div className="space-y-2">
          <Link href="/settings">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-blue-100 hover:text-white hover:bg-white/10 border-0"
            >
              <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Settings</span>
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-blue-100 hover:text-red-200 hover:bg-red-500/20 border-0"
            >
              <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Logout</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

export interface CurrentUser {
  id: number
  email: string
  phone_number: string
  age: number
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch("/api/me", { credentials: "include" })
        if (!res.ok) throw new Error("unauthorized")
        const data = await res.json()
        if (!cancelled) setUser(data.user)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { user, loading }
}



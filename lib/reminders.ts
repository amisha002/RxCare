"use client"

// Client-side reminders manager: uses Notification API and SpeechSynthesis

export type Reminder = {
  id: string
  title: string
  time: number // epoch ms
  message?: string
}

function speak(text: string) {
  try {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 1
    speechSynthesis.speak(utterance)
  } catch {}
}

async function ensurePermission(): Promise<boolean> {
  if (typeof window === "undefined") return false
  if (!("Notification" in window)) return false
  if (Notification.permission === "granted") return true
  if (Notification.permission === "denied") return false
  const res = await Notification.requestPermission()
  return res === "granted"
}

export class RemindersManager {
  private intervalId: number | null = null
  private reminders: Reminder[] = []

  constructor(initial: Reminder[] = []) {
    this.reminders = initial
  }

  async start() {
    const ok = await ensurePermission()
    if (!ok) return
    this.tick()
    this.intervalId = window.setInterval(() => this.tick(), 30 * 1000) // check every 30s
  }

  stop() {
    if (this.intervalId) window.clearInterval(this.intervalId)
    this.intervalId = null
  }

  setReminders(list: Reminder[]) {
    this.reminders = list
  }

  private tick() {
    const now = Date.now()
    for (const r of this.reminders) {
      if (now >= r.time && now - r.time < 60 * 1000) {
        // within 1 minute window
        new Notification(r.title || "Medicine Reminder", { body: r.message || "Time to take your medicine." })
        speak(r.message || "Time to take your medicine")
      }
    }
  }
}



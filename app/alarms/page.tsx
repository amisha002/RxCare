"use client";

import { useCallback, useEffect, useState } from "react";

type Notification = {
  id: number;
  scheduled_time: string;
  medicine: { medicine_name: string };
};

export default function AlarmPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [active, setActive] = useState<Notification | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  useEffect(() => {
    const el = new Audio("/alarm.mp3");
    el.loop = true;
    setAudio(el);
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/notifications/due`);
      if (!res.ok) return;
      const data: Notification[] = await res.json();
      if (data.length > 0) {
        setActive(data[0]);
        if (audio && soundEnabled) {
          try {
            await audio.play();
          } catch {
            // Fail silently; user may need to enable sound
          }
        }
      } else {
        setActive(null);
      }
    } catch {
      // ignore
    }
  }, [API_BASE, audio, soundEnabled]);

  useEffect(() => {
    const id = setInterval(fetchNotifications, 5000); // poll every 5s
    return () => clearInterval(id);
  }, [fetchNotifications]);

  const acknowledge = async (action: "taken" | "snooze") => {
    if (!active) return;
    await fetch(`${API_BASE}/api/notifications/acknowledge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: active.id, action }),
    });
  };

  const handleTaken = async () => {
    if (audio) audio.pause();
    await acknowledge("taken");
    setActive(null);
    // Immediate user feedback
    alert("✅ Medicine Taken!");
    // Immediately check if another alarm is due
    fetchNotifications();
  };

  const handleSnooze = async () => {
    if (audio) audio.pause();
    await acknowledge("snooze");
    setActive(null);
    // Immediate user feedback
    alert("⏰ Snoozed! You'll be reminded again soon.");
  };

  if (!soundEnabled)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center shadow-inner">
            <span className="text-4xl">🔈</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Enable alarm sound</h2>
          <p className="text-gray-500 mt-1 mb-6">Tap below to allow sound for alarms.</p>
          <button
            onClick={async () => {
              if (!audio) return;
              try {
                await audio.play();
                setSoundEnabled(true);
                // Pause until an alarm is active
                audio.pause();
              } catch {
                // If still blocked, keep the gate visible
              }
            }}
            className="px-6 py-3 rounded-xl bg-rose-600 text-white font-medium shadow hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200"
          >
            Enable sound
          </button>
        </div>
      </div>
    );

  if (!active)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner animate-pulse">
            <span className="text-4xl">🔕</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">No active alarms</h2>
          <p className="text-gray-500 mt-1">We’ll alert you here when it’s time.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-gradient-to-b from-rose-50 to-white px-4">
      <div className="w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose-100 blur-2xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-pink-50 blur-2xl" />

          <div className="relative p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl md:text-4xl">⏰</span>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Time to take <span className="text-rose-600">{active.medicine.medicine_name}</span>
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <button
                onClick={handleTaken}
                className="group relative w-full overflow-hidden rounded-2xl bg-green-600 px-6 py-5 text-white shadow-lg transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200"
              >
                <div className="flex items-center justify-center gap-3 text-lg md:text-xl font-semibold">
                  <span>✅</span>
                  <span>Taken</span>
                </div>
              </button>

              <button
                onClick={handleSnooze}
                className="group relative w-full overflow-hidden rounded-2xl bg-yellow-500 px-6 py-5 text-white shadow-lg transition hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-200"
              >
                <div className="flex items-center justify-center gap-3 text-lg md:text-xl font-semibold">
                  <span>😴</span>
                  <span>Snooze 5 min</span>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Keep this page open to receive alerts. Sound will loop until you take action.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";

type Notification = {
  id: number;
  scheduled_time: string;
  medicine: { medicine_name: string };
};

export default function AlarmPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin.replace(':3000', ':3001') : "");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [active, setActive] = useState<Notification | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try { return localStorage.getItem('rxmind_audio_unlocked') === '1'; } catch { return false; }
  });
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  // Initialize audio once when component mounts
  useEffect(() => {
    const alarmAudio = new Audio("/alarm.mp3");
    alarmAudio.loop = true;
    alarmAudio.volume = 0.7; // Default volume 70%
    alarmAudio.preload = "auto";
    
    // Enable background audio playback
    alarmAudio.setAttribute('data-background', 'true');
    
    // Handle audio events
    alarmAudio.addEventListener('play', () => setIsPlaying(true));
    alarmAudio.addEventListener('pause', () => setIsPlaying(false));
    alarmAudio.addEventListener('ended', () => setIsPlaying(false));
    
    setAudio(alarmAudio);
    
    // Request audio focus for background playback
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => alarmAudio.play());
      navigator.mediaSession.setActionHandler('pause', () => alarmAudio.pause());
      navigator.mediaSession.setActionHandler('stop', () => {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
      });
    }
    
    console.log("🔊 Audio initialized with background playback support");
  }, []);

  // One-time user gesture to unlock autoplay
  const unlockAudio = useCallback(async () => {
    if (!audio || audioUnlocked) return;
    try {
      const previousVolume = audio.volume;
      audio.volume = 0; // play silently to satisfy autoplay policy
      await audio.play();
      await new Promise((r) => setTimeout(r, 50));
      audio.pause();
      audio.currentTime = 0;
      audio.volume = previousVolume;

      setAudioUnlocked(true);
      try { localStorage.setItem('rxmind_audio_unlocked', '1'); } catch {}
      console.log('🔓 Audio unlocked by user interaction');
    } catch (e) {
      console.log('❌ Failed to unlock audio (will retry on next interaction):', e);
    }
  }, [audio, audioUnlocked]);

  useEffect(() => {
    // Restore unlocked state
    try {
      if (localStorage.getItem('rxmind_audio_unlocked') === '1') {
        setAudioUnlocked(true);
      }
    } catch {}

    // Attach one-time interaction listeners to unlock audio
    const handler = () => unlockAudio();
    window.addEventListener('click', handler, { once: true });
    window.addEventListener('touchstart', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('click', handler as any);
      window.removeEventListener('touchstart', handler as any);
      window.removeEventListener('keydown', handler as any);
    };
  }, [unlockAudio]);

  // If navigated from a notification, fetch immediately for faster playback
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('fromNotification') === '1') {
        // Try to unlock silently and fetch immediately
        if (!audioUnlocked && (navigator as any).userActivation && !(navigator as any).userActivation.isActive) {
          // attempt silent unlock sequence
          if (audio) {
            (async () => {
              try {
                const prev = audio.volume;
                audio.volume = 0;
                await audio.play();
                await new Promise(r => setTimeout(r, 30));
                audio.pause();
                audio.currentTime = 0;
                audio.volume = prev;
                setAudioUnlocked(true);
                try { localStorage.setItem('rxmind_audio_unlocked', '1'); } catch {}
              } catch {}
              fetchNotifications();
              setIsBootstrapping(false);
            })();
            return;
          }
        }
        fetchNotifications();
        setIsBootstrapping(false);
      }
    } catch {}
  }, []);

  // Safety: end bootstrap phase shortly after mount if no special flow
  useEffect(() => {
    const id = setTimeout(() => setIsBootstrapping(false), 300);
    return () => clearTimeout(id);
  }, []);

  // Handle page visibility changes for background audio
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audio && isPlaying) {
        console.log("📱 Page hidden, but audio continues playing...");
        // Audio will continue playing in background
      } else if (!document.hidden && audio && isPlaying) {
        console.log("📱 Page visible again, audio still playing");
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [audio, isPlaying]);

  // Keep audio playing even when page loses focus
  useEffect(() => {
    const handleWindowBlur = () => {
      if (audio && isPlaying) {
        console.log("🪟 Window lost focus, but audio continues...");
        // Audio will continue playing
      }
    };

    const handleWindowFocus = () => {
      if (audio && isPlaying) {
        console.log("🪟 Window regained focus, audio still playing");
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [audio, isPlaying]);

  // Listen for SW messages to immediately fetch and attempt playback
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const handler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NOTIFICATION_CLICKED') {
        fetchNotifications();
      }
    };
    navigator.serviceWorker.addEventListener('message', handler);
    return () => navigator.serviceWorker.removeEventListener('message', handler);
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/notifications/due`);
      if (!res.ok) return;
      const data: Notification[] = await res.json();
      if (data.length > 0) {
        setActive(data[0]);
        // Play alarm sound immediately when alarm is due
        if (audio && !isPlaying) {
          try {
            if (!audioUnlocked && !(navigator as any).userActivation?.isActive) {
              console.log('🔒 Audio not unlocked yet. Waiting for user interaction...');
              return;
            }
            audio.currentTime = 0;
            await audio.play();
            console.log("🔊 Alarm sound started with background playback");
          } catch (error) {
            console.error("❌ Failed to play alarm sound:", error);
          }
        }
      } else {
        setActive(null);
        // Stop alarm sound when no active alarms
        if (audio && isPlaying) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error);
    }
  }, [API_BASE, audio, isPlaying, audioUnlocked]);

  useEffect(() => {
    const id = setInterval(fetchNotifications, 5000); // poll every 5s
    return () => clearInterval(id);
  }, [fetchNotifications]);

  const acknowledge = async (action: "taken" | "snooze") => {
    if (!active) return;
    try {
      await fetch(`${API_BASE}/api/notifications/acknowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: active.id, action }),
      });
    } catch (error) {
      console.error("❌ Failed to acknowledge notification:", error);
    }
  };

  const handleTaken = async () => {
    // Stop alarm sound
    if (audio && isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    }
    await acknowledge("taken");
    setActive(null);
    // Immediate user feedback
    alert("✅ Medicine Taken!");
    // Immediately check if another alarm is due
    fetchNotifications();
  };

  const handleSnooze = async () => {
    // Stop alarm sound
    if (audio && isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    }
    await acknowledge("snooze");
    setActive(null);
    // Immediate user feedback
    alert("⏰ Snoozed! You'll be reminded again soon.");
  };

  if (!active)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner">
            <span className="text-4xl">🔕</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">No active alarms</h2>
          <p className="text-gray-500 mt-1">
            We'll alert you with push notifications and sound when it's time to take your medicine.
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Pro Tip:</strong> Keep this tab open for background alarm sounds!
            </p>
          </div>
          {!audioUnlocked && !isPlaying && !isBootstrapping && (
            <div className="mt-4">
              <button
                onClick={unlockAudio}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Enable Alarm Sound
              </button>
              <p className="text-xs text-gray-500 mt-2">Click to allow sound to play automatically.</p>
            </div>
          )}
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
              <div className="flex items-center gap-2">
                <span className={`text-2xl ${isPlaying ? 'text-green-600' : 'text-gray-400'}`}>
                  {isPlaying ? '🔊' : '🔇'}
                </span>
                <span className="text-sm text-gray-500">
                  {isPlaying ? 'Alarm Playing' : 'Alarm Stopped'}
                </span>
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
              Alarm sound will play continuously until you take action. 
              <br />
              <span className="text-blue-600 font-medium">
                💡 Keep this tab open for background audio!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

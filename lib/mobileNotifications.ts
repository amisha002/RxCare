"use client";

import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

export async function initializeMobileNotifications(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await LocalNotifications.requestPermissions();

    if (Capacitor.getPlatform() === "android") {
      // Ensure a channel with custom sound exists. The sound file must be placed at
      // android/app/src/main/res/raw/alarm.mp3 and referenced without extension.
      await LocalNotifications.createChannel({
        id: "alarms",
        name: "Alarms",
        description: "Medication reminders",
        importance: 5, // IMPORTANCE_HIGH
        sound: "alarm",
        visibility: 1,
        vibration: true,
        lights: true,
        lightColor: "#FF0000",
      });
    }
  } catch (error) {
    console.error("Failed to initialize mobile notifications:", error);
  }
}

export async function scheduleLocalAlarm(
  title: string,
  body: string,
  at: Date
): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  const isAndroid = Capacitor.getPlatform() === "android";
  const isIOS = Capacitor.getPlatform() === "ios";

  await LocalNotifications.schedule({
    notifications: [
      {
        id: Math.floor(Math.random() * 1000000),
        title,
        body,
        schedule: { at },
        channelId: isAndroid ? "alarms" : undefined,
        sound: isAndroid ? "alarm" : isIOS ? "alarm.mp3" : undefined,
      },
    ],
  });
}



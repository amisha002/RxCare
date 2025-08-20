// src/lib/twilio.ts
import Twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
  throw new Error("Missing Twilio credentials. Check env vars.");
}

export const twilio = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// import { otpStore } from "../sendOtp/route";

// export default function handler(req:any, res:any) {
//   if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

//   const { phone, otp } = req.body;
//   if (!phone || !otp) return res.status(400).json({ error: "Phone and OTP required" });

//   if (otpStore[phone] && otpStore[phone] == otp) {
//     delete otpStore[phone]; // clear after success
//     return res.json({ success: true, message: "OTP verified successfully" });
//   }

//   return res.status(400).json({ success: false, error: "Invalid OTP" });
// }

// app/api/users/verifyOtp/route.ts
import { NextResponse } from "next/server";

// Import the otpStore from sendOtp route
// Note: In production, you should use a proper database or Redis for OTP storage
let otpStore: { [key: string]: { otp: number; timestamp: number } } = {};

// This is a workaround to share the otpStore between routes
// In production, use a database or external storage
if (typeof global !== 'undefined') {
  if (!(global as any).otpStore) {
    (global as any).otpStore = {};
  }
  otpStore = (global as any).otpStore;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, otp } = body;

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Phone and OTP required" },
        { status: 400 }
      );
    }

    const storedOtpData = otpStore[phone];

    if (!storedOtpData) {
      return NextResponse.json(
        { success: false, error: "OTP not found or expired" },
        { status: 400 }
      );
    }

    // Check if OTP is expired (10 minutes)
    if (Date.now() - storedOtpData.timestamp > 10 * 60 * 1000) {
      delete otpStore[phone];
      return NextResponse.json(
        { success: false, error: "OTP has expired" },
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedOtpData.otp === parseInt(otp)) {
      delete otpStore[phone]; // Clear OTP after successful verification
      return NextResponse.json(
        { success: true, message: "OTP verified successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Invalid OTP" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
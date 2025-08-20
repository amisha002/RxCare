// import axios from "axios";

// let otpStore: { [key: string]: number } = {}; // TEMP: phone -> otp mapping

// export default async function handler(req:any, res:any) {
//   if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

//   const { phone } = req.body;
//   if (!phone) return res.status(400).json({ error: "Phone number required" });

//   // generate 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000);

//   // store temporarily
//   otpStore[phone] = otp;

//   try {
//     await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "v3",       // dev route
//         sender_id: "FSTSMS", // default sender_id for dev
//         message: `Your OTP is ${otp}`,
//         language: "english",
//         numbers: phone,
//       },
//       {
//         headers: {
//           authorization: process.env.FAST2SMS_API_KEY, // put API key in .env
//         },
//       }
//     );

//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (error:any) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to send OTP" });
//   }
// }

// export { otpStore };

// app/api/users/sendOtp/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

let otpStore: { [key: string]: { otp: number; timestamp: number } } = {}; // TEMP: phone -> {otp, timestamp} mapping

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number required" },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store temporarily with timestamp (expires in 10 minutes)
    otpStore[phone] = {
      otp,
      timestamp: Date.now()
    };

    // Clean up expired OTPs (older than 10 minutes)
    Object.keys(otpStore).forEach(key => {
      if (Date.now() - otpStore[key].timestamp > 10 * 60 * 1000) {
        delete otpStore[key];
      }
    });

    try {
      await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          route: "v3",
          sender_id: "FSTSMS",
          message: `Your RxMind caregiver verification OTP is ${otp}. Valid for 10 minutes.`,
          language: "english",
          numbers: phone,
        },
        {
          headers: {
            authorization: process.env.FAST2SMS_API_KEY,
          },
        }
      );

      return NextResponse.json(
        { success: true, message: "OTP sent successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("SMS Error:", error.response?.data || error.message);
      return NextResponse.json(
        { error: "Failed to send OTP" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Request Error:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

export { otpStore };
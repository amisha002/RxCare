import { useState } from "react";
import axios from "axios";

export default function OtpForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  const sendOtp = async () => {
    try {
      await axios.post("/api/users/caregiver-verify/sendOtp", { phone });
      alert("OTP sent!");
      setStep("otp");
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("/api/users/verifyOtp", { phone, otp });
      if (res.data.success) {
        alert("OTP verified!");
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      alert("Error verifying OTP");
    }
  };

  return (
    <div>
      {step === "phone" && (
        <div>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}
      {step === "otp" && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

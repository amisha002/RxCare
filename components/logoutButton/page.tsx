"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include", // ensure cookies are sent
      });

      try{
        console.log("logged out successfully!");
        window.location.href = '/login' // redirect to login page
      }catch(e) {
        console.log(e);
      }
    } catch (err) {
      console.error("Error logging out", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

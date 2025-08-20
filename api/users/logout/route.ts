import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Clear JWT cookie
  res.setHeader("Set-Cookie", [
    `accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`,
    `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`,
  ]);

  return res.status(200).json({ message: "Logged out successfully" });
}

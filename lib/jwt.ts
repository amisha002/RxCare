// lib/jwt.ts
import jwt from "jsonwebtoken";

const ACCESS_TTL = "30m";   // access: 30 minutes
const REFRESH_TTL = "30d";  // refresh: 30 days

export function signAccessToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: ACCESS_TTL });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, process.env.REFRESH_SECRET as string, { expiresIn: REFRESH_TTL });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.REFRESH_SECRET as string) as jwt.JwtPayload;
}

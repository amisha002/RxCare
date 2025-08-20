// crypto helpers
import crypto from "crypto";

export function generateJti() {
  return crypto.randomUUID();
}

export function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

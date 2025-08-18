import { cookies } from "next/headers";
export async function getCookie(name: string): Promise<string | null> {
  const cookieStore = await cookies(); // Add await here
  const value = cookieStore.get(name)?.value || null;
  return value;
}
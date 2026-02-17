import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

const API_SERVER_URL = process.env.API_SERVER_URL ?? "http://localhost:4000";

export async function requireSessionUser() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("auth_user")?.value;

  if (!userEmail) {
    redirect("/login");
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((item) => `${item.name}=${encodeURIComponent(item.value)}`)
    .join("; ");

  const response = await fetch(`${API_SERVER_URL}/auth/me`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader
    },
    cache: "no-store"
  });

  if (!response.ok) {
    redirect("/login");
  }

  const payload = (await response.json()) as { user?: SessionUser };

  if (!payload.user) {
    redirect("/login");
  }

  return payload.user;
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("auth_user")?.value;
  redirect(userEmail ? "/home" : "/login");
}

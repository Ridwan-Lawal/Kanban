import { getSession } from "@/features/auth/auth-service";
import { redirect } from "next/navigation";

export async function checkIfUserIsAuthenticated() {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  return { user: session.user };
}

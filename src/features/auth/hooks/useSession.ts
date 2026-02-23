import { authClient } from "@/lib/auth-client";

export function useSession() {
  const { data } = authClient.useSession();

  return { ...data };
}

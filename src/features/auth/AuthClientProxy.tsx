"use client";

import { authClient } from "@/lib/auth-client";
import { authRoutes, DEFAULT_REDIRECT_URL, publicRoutes } from "@/route";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AuthClientProxy({ children }: PropsWithChildren) {
  const session = authClient.useSession();
  const isUserLoggedIn = !!session.data;
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  useEffect(() => {
    if (!isUserLoggedIn && !isPublicRoute && !isAuthRoute) {
      router.push("/login");
      return;
    }

    if (isUserLoggedIn && isAuthRoute) {
      router.push(DEFAULT_REDIRECT_URL);
      return;
    }
  }, [router, isPublicRoute, isAuthRoute, isUserLoggedIn]);

  return children;
}

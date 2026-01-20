import { getSession } from "@/features/auth/auth-service";
import { authApiRoutePrefix, authRoutes, DEFAULT_REDIRECT_URL, publicRoutes } from "@/route";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const isUserLoggedIn = await getSession();
  const { nextUrl } = req;
  const currentPath = nextUrl.pathname;
  const isUserJustSignedUp = isUserLoggedIn?.user?.isFirstLogin;

  const isPublicRoute = publicRoutes.includes(currentPath);
  const isAuthRoute = authRoutes.includes(currentPath);
  const isAuthApiRoute = currentPath.startsWith(authApiRoutePrefix);
  const isOnboardingRoute = currentPath === "/onboarding";

  if (isPublicRoute) return;
  if (isAuthApiRoute) return;
  if (!isUserLoggedIn && isAuthRoute) return;

  if (isUserLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));

  if (isUserLoggedIn) {
    if (isUserJustSignedUp) {
      if (!isOnboardingRoute) {
        return Response.redirect(new URL("/onboarding", nextUrl));
      }
      return NextResponse.next();
    }
    if (!isUserJustSignedUp && isOnboardingRoute) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
    }
  }

  if (!isUserLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/login?from=${encodedCallbackUrl}`, nextUrl));
  }

  //   for the onboarding page

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

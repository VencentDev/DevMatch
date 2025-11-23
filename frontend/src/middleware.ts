import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("ACCESS_TOKEN")?.value || null;
  const profileCompleted = req.cookies.get("profileCompleted")?.value === "true";

  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // Public routes (NO auth required)
  const publicRoutes = ["/", "/home-page", "/login", "/signup"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Profile setup route
  const isProfileRoute = pathname.startsWith("/finish-profile");

  // Force no cache
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

  // Block logged-in users from /login and /signup
  if ((pathname.startsWith("/login") || pathname.startsWith("/signup")) && token) {
    url.pathname = "/feed";
    return NextResponse.redirect(url);
  }

  // If user is NOT logged in and trying to access a protected route → redirect to login
  if (!isPublicRoute && !isProfileRoute && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If accessing /finish-profile without token → redirect
  if (isProfileRoute && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If profile is already completed → block access to finish-profile
  if (isProfileRoute && profileCompleted) {
    url.pathname = "/feed";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/:path*",         
  ],
};

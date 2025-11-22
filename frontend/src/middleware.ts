import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("ACCESS_TOKEN")?.value || null;
  const profileCompleted = req.cookies.get("profileCompleted")?.value === "true";

  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // Always force no-cache headers
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

  // Redirect root → home-page
  if (pathname === "/") {
    url.pathname = "/home-page";
    return NextResponse.redirect(url);
  }

  // Block access to /login if authenticated
  if (pathname.startsWith("/login") && token) {
    url.pathname = "/feed";
    return NextResponse.redirect(url);
  }

  // If /finish-profile is accessed without login → redirect
  if (pathname.startsWith("/finish-profile") && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If profile already finished → redirect
  if (pathname.startsWith("/finish-profile") && profileCompleted) {
    url.pathname = "/feed";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/", "/login", "/finish-profile/:path*"],
};

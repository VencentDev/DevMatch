import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value; // Retrieve the auth token from cookies
  const profileCompleted = req.cookies.get("profileCompleted")?.value === "true"; // Retrieve the profile completion flag from cookies

  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

    if (pathname === "/") {
    url.pathname = "/home-page";
    return NextResponse.redirect(url);
  }


  // If authentication is required and the user is not authenticated
  if (pathname.startsWith("/finish-profile") && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If the user has completed their profile, prevent access to the finish-profile page
  if (pathname.startsWith("/finish-profile") && profileCompleted) {
    url.pathname = "/feed";
    return NextResponse.redirect(url);
  }

  // If the user is already authenticated, prevent access to the login page
  if (pathname.startsWith("/login") && token) {
    url.pathname = "/feed";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/", "/finish-profile/:path*", "/login"], // Apply middleware to "/", finish-profile, and login routes
};
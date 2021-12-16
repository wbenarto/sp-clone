import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith("https://") ??
      !!process.env.VERCEL_URL,
  });
  console.log("middleware" + token);
  const { pathname } = req.nextUrl;

  if (token && pathname === "/login") {
    return NextResponse.next();
  }

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  try {
    if (!token && pathname !== "/login") {
      return NextResponse.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
}

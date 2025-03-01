import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ITokenData } from "./models/backend";
import { cookieKey } from "./constant/cookieKey";
import { verifyJWT } from "./lib/token";

// 1. Specify protected and public routes
const protectedRoutes = ["/", "/dashboard"];
const publicRoutes = ["/login", "/api-doc"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const token = (await cookies()).get(cookieKey.token)?.value;
  let session: ITokenData | undefined;
  if (token) session = await verifyJWT(token);
  console.log({ path, isProtectedRoute, isPublicRoute, token, session });

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.id &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

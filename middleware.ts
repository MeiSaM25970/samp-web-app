import { NextRequest, NextResponse } from "next/server";
import { ITokenData } from "./models/backend";
import { cookieKey } from "./constants/cookieKey";
import { verifyJWT } from "./lib/token";

// 1. Specify protected and public routes
export const protectedRoutes = ["/", "/dashboard", "/map"];
export const publicRoutes = ["/login", "/api-doc"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = req.cookies.get(cookieKey.token)?.value;

  // 3. Decrypt the session from the cookie
  let session: ITokenData | undefined;
  if (token) session = await verifyJWT(token);

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    const response = NextResponse.redirect(new URL("/login", req.nextUrl));
    response.cookies.set(cookieKey.token, "", {
      path: "/", // مسیر کوکی (مهم)
      maxAge: 0, // زمان انقضا صفر برای حذف کوکی
    });
    return response;
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session?.id) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (isPublicRoute && !session) {
    const response = NextResponse.next();
    response.cookies.set(cookieKey.token, "", {
      path: "/", // مسیر کوکی (مهم)
      maxAge: 0, // زمان انقضا صفر برای حذف کوکی
    });
    return response;
  }
  // if (path === "/") {
  //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  // }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

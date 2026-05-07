import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {

  const token =
    request.cookies.get("access_token")
      ?.value

  const pathname =
    request.nextUrl.pathname

  /*
    Public routes
  */
  const publicRoutes = [
    "/login",
    "/register"
  ]

  /*
    Protected routes
  */
  const protectedRoutes = [
    "/dashboard",
    "/users",
    "/settings",
    "/products",
    "/orders",
    "/profile"
  ]

  /*
    Check public route
  */
  const isPublicRoute =
    publicRoutes.includes(pathname)

  /*
    Check protected route
  */
  const isProtectedRoute =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )

  /*
    If NOT logged in
    and accessing protected route
  */
  if (!token && isProtectedRoute) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  /*
    If already logged in
    and accessing public route
  */
  if (token && isPublicRoute) {

    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
  }

  return NextResponse.next()
}

export const config = {

  matcher: [
    /*
      Run proxy for all routes
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}
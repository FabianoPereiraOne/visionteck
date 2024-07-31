import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = cookies().get("Authorization")
  const isRouterApi = request.nextUrl.pathname.startsWith("/api")
  const isRouterLogin = request.nextUrl.pathname.startsWith("/login")
  const isRouterRegister = request.nextUrl.pathname.startsWith("/login")
  const publicURL = new URL("/login", request.url)
  const privateURL = new URL("/dash", request.url)
  const decodedToken = await useReturnDecoded(token)

  if (token && (isRouterLogin || isRouterRegister))
    return NextResponse.redirect(privateURL)

  if (!token && (isRouterLogin || isRouterRegister)) return NextResponse.next()

  if (!token) return NextResponse.redirect(publicURL)

  if (!decodedToken) {
    cookies().delete("Authorization")
    return NextResponse.redirect(publicURL)
  }

  if (isRouterApi && decodedToken.type !== "ADMIN")
    return NextResponse.redirect(privateURL)

  return NextResponse.next()
}

export const config = {
  matcher: ["/dash/:path*", "/api/:path*", "/login", "/register"]
}

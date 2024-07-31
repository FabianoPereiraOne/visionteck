import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { useVerifyToken } from "./hooks/useVerifyToken"

export async function middleware(request: NextRequest) {
  const token = cookies().get("Authorization")
  const isRouterApi = request.nextUrl.pathname.startsWith("/api")
  const isRouterLogin = request.nextUrl.pathname.startsWith("/login")
  const isRouterRegister = request.nextUrl.pathname.startsWith("/register")
  const publicURL = new URL("/login", request.url)
  const privateURL = new URL("/dash", request.url)
  const decodedToken = await useReturnDecoded(token)
  const isLogged = await useVerifyToken(decodedToken)

  if (isLogged && (isRouterLogin || isRouterRegister))
    return NextResponse.redirect(privateURL)

  if (!isLogged && (isRouterLogin || isRouterRegister))
    return NextResponse.next()

  if (!isLogged) {
    return NextResponse.redirect(publicURL)
  }

  if (isRouterApi && decodedToken!.type !== "ADMIN")
    return NextResponse.redirect(privateURL)

  return NextResponse.next()
}

export const config = {
  matcher: ["/dash/:path*", "/api/:path*", "/login", "/register"]
}

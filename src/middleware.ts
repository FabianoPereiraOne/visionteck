import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { useVerifyToken } from "./hooks/useVerifyToken"

export async function middleware(request: NextRequest) {
  const token = cookies().get("Authorization")
  const isRouterDash = request.nextUrl.pathname.startsWith("/dash")
  const isRouterLogin = request.nextUrl.pathname.startsWith("/login")
  const isRouterRegister = request.nextUrl.pathname.startsWith("/register")
  const publicURL = new URL("/login", request.url)
  const privateURL = new URL("/dash", request.url)
  const decodedToken = await useReturnDecoded(token?.value)
  const isLogged = await useVerifyToken(decodedToken)

  if (isLogged && (isRouterLogin || isRouterRegister))
    return NextResponse.redirect(privateURL)

  if (!isLogged && isRouterDash) return NextResponse.redirect(publicURL)

  return NextResponse.next()
}

export const config = {
  matcher: ["/dash/:path*", "/login", "/register"]
}

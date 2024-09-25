import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { cookieAuth } from "./schemas/others/config"
import { PayloadType } from "./types/payload"

export async function middleware(request: NextRequest) {
  const token = cookies().get(cookieAuth)
  const isRouterDash = request.nextUrl.pathname.startsWith("/dash")
  const isRouterLogin = request.nextUrl.pathname.startsWith("/login")
  const isRouterRegister = request.nextUrl.pathname.startsWith("/register")
  const publicURL = new URL("/login", request.url)
  const privateURL = new URL("/dash", request.url)

  const logged: PayloadType | null = await useReturnDecoded(token?.value)

  if (logged && (isRouterLogin || isRouterRegister))
    return NextResponse.redirect(privateURL)

  if (!logged && isRouterDash) return NextResponse.redirect(publicURL)

  return NextResponse.next()
}

export const config = {
  matcher: ["/dash/:path*", "/login", "/register"]
}

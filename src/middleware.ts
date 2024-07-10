import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = cookies().get("Authorization")
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/api/:path*"]
}

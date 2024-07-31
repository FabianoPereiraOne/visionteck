import { PayloadType } from "@/types/payload"
import jose from "jose"

const key = process.env.NEXT_PUBLIC_SECRET_KEY ?? ""
const alg = process.env.NEXT_PUBLIC_ALGORITHM ?? ""
const secret = new TextEncoder().encode(key)

export async function verify(authorization: string) {
  const jwt = await jose.jwtVerify(authorization, secret)
  return jwt
}

export async function sign(payload: PayloadType) {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret)
  return jwt
}

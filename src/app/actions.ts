"use server"

import { cookies } from "next/headers"

const days = 24 * 60 * 60

export async function setCookie({
  name,
  value
}: {
  name: string
  value: string
}) {
  cookies().set(name, value, {
    expires: Date.now() - days,
    httpOnly: true,
    path: "/",
    sameSite: "lax"
  })
}

"use server"
import { cookieAuth } from "@/schemas/others/config"
import { baseURL } from "@/utils/http/baseUrl"
import { cookies } from "next/headers"

export const fetchAllNotes = async () => {
  const token = cookies().get(cookieAuth)?.value ?? ""

  const result = await fetch(`${baseURL}/api/notes`, {
    method: "GET",
    next: { tags: ["get-all-notes"] },
    credentials: "include",
    headers: {
      Authorization: token
    }
  })

  return result
}

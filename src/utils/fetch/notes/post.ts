"use server"
import { cookieAuth } from "@/schemas/others/config"
import { NoteProps } from "@/types/note"
import { baseURL } from "@/utils/http/baseUrl"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const fetchCreateNote = async (data: NoteProps) => {
  const token = cookies().get(cookieAuth)?.value ?? ""

  await fetch(`${baseURL}/api/notes`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Authorization: token
    }
  })

  revalidateTag("get-all-notes")
}

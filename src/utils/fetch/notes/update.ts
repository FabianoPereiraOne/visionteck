"use server"
import { cookieAuth } from "@/schemas/others/config"
import { baseURL } from "@/utils/http/baseUrl"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const fetchUpdateNote = async ({
  id,
  data
}: {
  id: number
  data: FieldValues
}) => {
  const token = cookies().get(cookieAuth)?.value ?? ""

  await fetch(`${baseURL}/api/notes?id=${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Authorization: token
    }
  })

  revalidateTag("get-all-notes")
}

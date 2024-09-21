"use server"
import { cookieAuth } from "@/schemas/others/config"
import { baseURL } from "@/utils/http/baseUrl"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const serverAPI = () => {
  const getAll = async ({ route }: { route: string }) => {
    "use server"

    const token = cookies().get(cookieAuth)?.value ?? ""

    const result = await fetch(`${baseURL}/api/${route}`, {
      method: "GET",
      next: { tags: [`get-all-${route}`] },
      credentials: "include",
      headers: {
        Authorization: token
      }
    })

    return result
  }

  const CreateOn = async ({ route, data }: { route: string; data: any }) => {
    "use server"

    const token = cookies().get(cookieAuth)?.value ?? ""

    try {
      await fetch(`${baseURL}/api/${route}`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          Authorization: token
        }
      })

      revalidateTag(`get-all-${route}`)
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateOn = async ({
    route,
    id,
    data
  }: {
    id: string | number
    route: string
    data: any
  }) => {
    "use server"

    const token = cookies().get(cookieAuth)?.value ?? ""

    await fetch(`${baseURL}/api/${route}?id=${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Authorization: token
      }
    })

    revalidateTag(`get-all-${route}`)
  }

  const DeleteOn = async ({
    route,
    id
  }: {
    id: string | number
    route: string
  }) => {
    "use server"

    const token = cookies().get(cookieAuth)?.value ?? ""

    await fetch(`${baseURL}/api/${route}?id=${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: token
      }
    })

    revalidateTag(`get-all-${route}`)
  }

  const GetOn = async ({
    route,
    id
  }: {
    id: string | number
    route: string
  }) => {
    "use server"

    const token = cookies().get(cookieAuth)?.value ?? ""

    const result = await fetch(`${baseURL}/api/${route}/${id}`, {
      method: "GET",
      credentials: "include",
      next: { tags: [`get-${route}`] },
      headers: {
        Authorization: token
      }
    })

    return result
  }

  return { getAll, CreateOn, UpdateOn, DeleteOn, GetOn }
}

export default serverAPI

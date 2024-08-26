import { cookies } from "next/headers"

const useSaveTokenAuth = () => {
  const saveTokenAuth = async (token: string) => {
    const fiveDays = 24 * 60 * 60 * 1000
    const today = Date.now()

    await cookies().set({
      name: "name",
      value: "value",
      httpOnly: false,
      path: "/",
      expires: today + fiveDays
    })
  }

  return { saveTokenAuth }
}

export default useSaveTokenAuth

import { cookies } from "next/headers"

const useSaveTokenAuth = () => {
  const saveTokenAuth = async (token: string) => {
    const oneDay = 24 * 60 * 60 * 1000
    const today = Date.now()

    await cookies().set({
      name: "Authorization",
      value: token,
      httpOnly: true,
      path: "/",
      expires: today + oneDay
    })
  }

  return { saveTokenAuth }
}

export default useSaveTokenAuth

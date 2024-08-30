import { UserProps } from "@/types/user"

export const createAccount = async ({
  user,
  password
}: {
  user: UserProps
  password: string
}) => {
  const result = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
      password
    }
  })

  return result
}

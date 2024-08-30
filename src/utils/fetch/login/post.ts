export const fetchLogin = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const result = await fetch("/api/sign", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-type": "application/json",
      password
    }
  })

  return result
}

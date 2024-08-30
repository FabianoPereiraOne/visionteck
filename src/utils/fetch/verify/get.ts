export const verifyAccount = async ({
  id,
  token
}: {
  id: string
  token: string
}) => {
  const result = await fetch(`/api/verify?id=${id}&token=${token}`, {
    method: "GET"
  })

  return result
}

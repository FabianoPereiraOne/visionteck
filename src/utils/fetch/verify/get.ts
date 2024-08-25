export const verifyAccount = async ({
  id,
  token
}: {
  id: string
  token: string
}) => {
  const baseURl = process.env.NEXT_PUBLIC_URL ?? ""

  const result = await fetch(`${baseURl}/api/verify?id=${id}&token=${token}`, {
    method: "GET"
  })

  return result
}

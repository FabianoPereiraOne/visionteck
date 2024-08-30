export const fetchUser = async ({ id }: { id: string }) => {
  const baseURL = process.env.NEXT_PUBLIC_URL 

  const result = await fetch(`${baseURL}/api/users?id=${id}`, {
    method: "GET"
  })

  return result
}

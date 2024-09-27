export const fetchClientUser = async () => {
  const result = await fetch("/api/user", {
    method: "GET"
  })

  return result
}

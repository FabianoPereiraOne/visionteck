export const fetchLogout = async () => {
  const result = await fetch("/api/sign", {
    method: "GET"
  })

  return result
}

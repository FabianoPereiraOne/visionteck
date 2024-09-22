export const fetchClientAllTrains = async () => {
  const result = await fetch(`/api/trains`, {
    method: "GET"
  })

  return result
}

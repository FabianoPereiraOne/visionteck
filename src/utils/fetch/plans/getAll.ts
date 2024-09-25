export const fetchClientAllPlans = async () => {
  const result = await fetch("/api/plans", {
    method: "GET"
  })

  return result
}

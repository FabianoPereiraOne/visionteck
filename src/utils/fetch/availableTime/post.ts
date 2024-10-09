export const fetchCreateAvailableTime = async () => {
  const result = await fetch("/api/available", {
    method: "POST",
    body: JSON.stringify({ userId: "99ecac11-173c-46db-b7b1-8faa4aae0370" })
  })

  return result
}

export const fetchTrain = async ({ id }: { id: string }) => {
  const result = await fetch(`/api/trains/${id}`, {
    method: "GET"
  })

  return result
}

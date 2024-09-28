export const fetchDeleteClass = async ({ id }: { id: string }) => {
  const result = await fetch(`/api/classes?id=${id}`, {
    method: "DELETE"
  })

  return result
}

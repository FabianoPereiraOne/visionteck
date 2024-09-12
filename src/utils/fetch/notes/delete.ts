export const fetchDeleteNote = async ({ id }: { id: number }) => {
  const result = await fetch(`/api/notes?id=${id}`, {
    method: "DELETE"
  })

  return result
}

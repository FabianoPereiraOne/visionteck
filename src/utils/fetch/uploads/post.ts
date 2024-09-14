export const fetchUploadFile = async ({ data }: { data: FormData }) => {
  const result = await fetch("/api/upload", {
    method: "POST",
    body: data
  })

  return result
}

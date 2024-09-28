import { postClassProps } from "@/types/class"

export const fetchCreateClass = async ({ data }: { data: postClassProps }) => {
  const result = await fetch("/api/classes", {
    method: "POST",
    body: JSON.stringify(data)
  })

  return result
}

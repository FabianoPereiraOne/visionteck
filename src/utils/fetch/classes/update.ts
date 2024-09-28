import { patchClassProps } from "@/types/class"

export const fetchUpdateClass = async (data: patchClassProps) => {
  const result = await fetch(`/api/classes?id=${data?.id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  })

  return result
}

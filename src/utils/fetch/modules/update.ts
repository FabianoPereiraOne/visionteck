import { patchModuleProps } from "@/types/module"

export const fetchUpdateModule = async (data: patchModuleProps) => {
  const result = await fetch(`/api/modules?id=${data?.id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  })

  return result
}

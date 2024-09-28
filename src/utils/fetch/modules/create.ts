import { postModuleProps } from "@/types/module"

export const fetchCreateModule = async ({
  data
}: {
  data: postModuleProps
}) => {
  const result = await fetch("/api/modules", {
    method: "POST",
    body: JSON.stringify(data)
  })

  return result
}

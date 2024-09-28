export const fetchClientAllModules = async () => {
  const result = await fetch(`/api/modules`, {
    method: "GET"
  })

  return result
}

export const useParseDate = (dateString: string) => {
  const converted = Date.parse(dateString)

  return !isNaN(converted) ? new Date(dateString).toISOString() : null
}

const useVerifyDate = () => {
  const isValidDate = (date: any, ignoreUndefined?: boolean) => {
    if (typeof date === "object" || date === "") return false

    const schemaDate =
      /^(?:(\d{2}\/\d{2}\/\d{4})|(\d{4}\/\d{2}\/\d{2})|(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z))$/
    const isValid = schemaDate.test(date) || typeof date === "boolean"

    if (isValid || ignoreUndefined) return true

    return false
  }

  return { isValidDate }
}

export default useVerifyDate

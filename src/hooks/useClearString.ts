const useClearString = () => {
  const clearString = (fileName = "") => {
    const cleanedName = fileName
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\s]+/g, "-")
      .replace(/[^\w.-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/-+$/, "")
      .toLowerCase()

    return cleanedName
  }

  return { clearString }
}

export default useClearString

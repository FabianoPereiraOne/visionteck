export const useVerifyArrayEmpty = () => {
  const isEmpty = (data: any[]) => {
    if (!data) return true

    return data?.length <= 0
  }

  return { isEmpty }
}

export const useParseNumber = (numberString: string) => {
  const converted = Number(numberString)

  return !Number.isNaN(converted) ? converted : 0
}

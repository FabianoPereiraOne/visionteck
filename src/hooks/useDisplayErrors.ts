import { useCallback } from "react"
import toast from "react-hot-toast"
import { ZodIssue } from "zod"

const useDisplayErrors = () => {
  const displayErrors = useCallback((errors: ZodIssue[]) => {
    console.error(errors)

    const errorsString = errors?.map((error: any) => {
      return `${error?.message}`
    })

    const errorFormatted = Array.from(new Set(errorsString)).join("\n")

    return toast.error(errorFormatted, {})
  }, [])

  return { displayErrors }
}

export default useDisplayErrors

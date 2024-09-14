import { unlink } from "fs/promises"
import path from "path"

const useDeleteImageBucket = () => {
  const deleteImageBucket = async ({ name }: { name: string }) => {
    const replacePaste = new RegExp(`^/uploads/`)
    const filePath = path.resolve(
      process.cwd(),
      "public",
      "uploads",
      name.replace(replacePaste, "")
    )
    await unlink(filePath)
  }

  return { deleteImageBucket }
}

export default useDeleteImageBucket

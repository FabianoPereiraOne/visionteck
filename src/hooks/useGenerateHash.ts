import bcrypt from "bcrypt"

const useGenerateHash = () => {
  const salt = 10
  const hashGenerate = async (password: string) => {
    return await bcrypt.hash(password, salt)
  }
  return { hashGenerate }
}

export default useGenerateHash

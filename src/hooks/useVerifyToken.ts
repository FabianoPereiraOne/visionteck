import { fetchCollaborator } from "../services/prisma/collaborators/fetch"
import { verify } from "../utils/jwt"

export const useVerifyToken = async (token: string) => {
  const decodedToken = await verify(token)

  if (typeof decodedToken == "string")
    throw new Error("Unable to validate token")

  const result = await fetchCollaborator(decodedToken.id)

  return result
}

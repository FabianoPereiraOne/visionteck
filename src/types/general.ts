import { dataUser } from "./user"

export type paramsProps = {
  id?: string
}

export type AppContextType = {
  user: dataUser | null
  setUser: (user: any) => void
}

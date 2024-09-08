import { dataUser } from "./user"

export type paramsProps = {
  id?: string
}

export type AppContextType = {
  user: dataUser | null
  openMenu: boolean
  setUser: (user: any) => void
  setOpenMenu: (open: boolean) => void
}

export type searchParamsProps = {
  id?: string
  token?: string
}

export type paramsProps = {
  id?: string
}

export type AppContextType = {
  openMenu: boolean
  openPopup: boolean
  setOpenMenu: (open: boolean) => void
  setOpenPopup: (open: boolean) => void
}

export type searchParamsProps = {
  id?: string
  token?: string
}

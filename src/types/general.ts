import { TypeAds } from "./ads"
import { Collection } from "./collection"
import { NoteProps } from "./note"
import { Train } from "./train"

export type paramsProps = {
  id?: string
}

export type AppContextType = {
  trains: Train[]
  openMenu: boolean
  openPopup: boolean
  setOpenMenu: (open: boolean) => void
  setOpenPopup: (open: boolean) => void
  setTrains: (trains: Train[]) => void
}

export type searchParamsProps = {
  id?: string
  token?: string
}

export type DataLoadType = Collection[] | Train[] | NoteProps[] | TypeAds[]

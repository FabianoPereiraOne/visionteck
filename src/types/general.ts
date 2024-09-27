import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue
} from "react-hook-form"
import { TypeAds } from "./ads"
import { Collection } from "./collection"
import { Module } from "./module"
import { NoteProps } from "./note"
import { Train } from "./train"
import { dataUser } from "./user"

export type paramsProps = {
  id?: string
}

export type AppContextType = {
  trains: Train[]
  openMenu: boolean
  openPopup: boolean
  user: dataUser | null
  setOpenMenu: (open: boolean) => void
  setOpenPopup: (open: boolean) => void
  setTrains: (trains: Train[]) => void
  setUser: (user: dataUser | null) => void
  reset: UseFormReset<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

export type searchParamsProps = {
  id?: string
  token?: string
}

export type DataLoadType =
  | Collection[]
  | Train[]
  | NoteProps[]
  | TypeAds[]
  | Module[]

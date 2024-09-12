import { FormEventHandler } from "react"
import { LayoutType } from "./layout"

export type PopupProps = {
  data: []
  loading: boolean
  layout: LayoutType
  fcToggle: () => void
  fcSubmit: (data: any) => void
  fcEdit: (item: any) => void
  fcDel: (item: any) => void
  fcHandleSubmit: (data: any) => FormEventHandler<HTMLFormElement>
}

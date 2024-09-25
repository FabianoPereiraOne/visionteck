import { DataLoadType } from "./general"
import { LayoutType } from "./layout"

export type PopupProps = {
  update: boolean
  layout: LayoutType
  fcToggle: () => void
  fcSubmit: (data: any) => void
  fcEdit: (item: any) => void
  fcDel: (item: any) => void
  data: DataLoadType
}

export type DataViewProps = {
  fcEdit: (item: any) => void
  fcDel: (item: any) => void
  data: DataLoadType
}

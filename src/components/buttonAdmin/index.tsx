"use client"
import Popup from "@/components/popup"
import { DataLoadType } from "@/types/general"
import { LayoutType } from "@/types/layout"
import { ReactNode, useState } from "react"
import { FieldValues, UseFormReset } from "react-hook-form"
import { FiSettings } from "react-icons/fi"
import styled from "./style.module.scss"

const ButtonAdmin = ({
  title = "",
  reset,
  data,
  update,
  layout,
  variant = "default",
  iconButton,
  fcDelete,
  fcLoadSetValues,
  fcSubmit,
  fcUpdate
}: {
  title?: string
  update: boolean
  layout: LayoutType
  iconButton?: ReactNode
  variant?: "circle" | "default"
  reset: UseFormReset<FieldValues>
  fcDelete: (item: any) => void
  fcLoadSetValues: (item: any) => void
  fcSubmit: () => void
  fcUpdate: () => void
  data: DataLoadType
}) => {
  const [open, setOpen] = useState(false)

  const variants = {
    circle: styled.btnBullet,
    default: styled.button
  }

  const handlerTogglePopup = () => {
    if (open) reset()

    setOpen(oldValue => !oldValue)
  }

  return (
    <>
      <button className={variants[variant]} onClick={handlerTogglePopup}>
        {iconButton ? iconButton : <FiSettings />} {title}
      </button>
      {open && (
        <Popup
          fcDel={fcDelete}
          fcEdit={fcLoadSetValues}
          data={data}
          fcSubmit={update ? fcUpdate : fcSubmit}
          fcToggle={handlerTogglePopup}
          layout={layout}
          update={update}
        />
      )}
    </>
  )
}

export default ButtonAdmin

"use client"
import Popup from "@/components/popup"
import { LayoutType } from "@/types/layout"
import { ReactNode, useState } from "react"
import { FiSettings } from "react-icons/fi"
import styled from "./style.module.scss"

const ButtonAdmin = ({
  title = "",
  update,
  layout,
  variant = "default",
  iconButton,
  fcDelete,
  fcLoadSetValues,
  fcSubmit,
  fcUpdate,
  fcGetData
}: {
  title?: string
  update: boolean
  layout: LayoutType
  iconButton?: ReactNode
  variant?: "circle" | "default"
  fcDelete: (item: any) => void
  fcLoadSetValues: (item: any) => void
  fcSubmit: () => void
  fcUpdate: () => void
  fcGetData: () => Promise<Response>
}) => {
  const [open, setOpen] = useState(false)

  const variants = {
    circle: styled.btnBullet,
    default: styled.button
  }

  const handlerTogglePopup = () => {
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
          fcGetData={fcGetData}
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

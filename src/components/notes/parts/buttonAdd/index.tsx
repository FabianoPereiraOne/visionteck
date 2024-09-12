"use client"
import Popup from "@/components/popup"
import { layoutAddNote } from "@/layouts/note/add"
import { memo, useState } from "react"
import { FiPlus } from "react-icons/fi"
import styled from "./style.module.scss"

const ButtonAdd = () => {
 const [open, setOpen] = useState(false)

 const handlerTogglePopup = () => {
  setOpen(internalValue => !internalValue)
 }

 return (
  <>
   <button className={styled.btnAdd} onClick={handlerTogglePopup}>
    <FiPlus />
   </button>
   {open && <Popup fcToggle={handlerTogglePopup} layout={layoutAddNote} data={[]} />}
  </>
 )
}

export default memo(ButtonAdd)

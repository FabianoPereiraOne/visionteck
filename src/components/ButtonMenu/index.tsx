"use client"
import { useVisionContext } from "@/context"
import { memo } from "react"
import { FiMenu } from "react-icons/fi"
import styled from "./style.module.scss"

const ButtonMenu = () => {
 const { setOpenMenu, openMenu } = useVisionContext()

 const handlerToggleMenu = () => {
  setOpenMenu(!openMenu)
 }

 return (
  <button className={styled.btnMenu} onClick={handlerToggleMenu}>
   <FiMenu />
  </button>
 )
}

export default memo(ButtonMenu)
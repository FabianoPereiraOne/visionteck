"use client"
import { useVisionContext } from "@/context"
import Link from "next/link"
import {
  FiCalendar,
  FiGrid,
  FiHeadphones,
  FiHome,
  FiSettings
} from "react-icons/fi"
import styled from "./style.module.scss"

const NavLinks = () => {
  const { setOpenMenu } = useVisionContext()

  const handlerCloseSidebar = () => {
    setOpenMenu(false)
  }

  return (
    <nav className={styled.navigation}>
      <Link href='/dash' onClick={handlerCloseSidebar}>
        <FiHome />
        Inicio
      </Link>
      <Link href='/dash/trains' onClick={handlerCloseSidebar}>
        <FiGrid />
        Trilhas
      </Link>
      <Link href='/dash/meeting' onClick={handlerCloseSidebar}>
        <FiCalendar />
        Consultoria
      </Link>
      <Link href='/dash/help' onClick={handlerCloseSidebar}>
        <FiHeadphones />
        Suporte
      </Link>
      <Link href='/dash/settings' onClick={handlerCloseSidebar}>
        <FiSettings />
        Configurações
      </Link>
    </nav>
  )
}

export default NavLinks

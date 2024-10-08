"use client"
import { useVisionContext } from "@/context"
import { messageWhats, numberWhats } from "@/schemas/others/help"
import Link from "next/link"
import {
  FiCalendar,
  FiGrid,
  FiHeadphones,
  FiHome,
  FiSettings
} from "react-icons/fi"
import { useMediaQuery } from "react-responsive"
import styled from "./style.module.scss"

const NavLinks = () => {
  const { setOpenMenu } = useVisionContext()
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })

  const handlerCloseSidebar = () => {
    isTabletOrMobile && setOpenMenu(false)
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
      <Link
        href={`https://wa.me/${numberWhats}?text=${messageWhats}`}
        target='_blank'
        onClick={handlerCloseSidebar}
      >
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

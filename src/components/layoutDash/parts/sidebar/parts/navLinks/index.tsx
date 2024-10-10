"use client"
import { useVisionContext } from "@/context"
import { messageWhats, numberWhats } from "@/schemas/others/help"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiGrid, FiHeadphones, FiHome, FiSettings } from "react-icons/fi"
import { useMediaQuery } from "react-responsive"
import styled from "./style.module.scss"

const NavLinks = () => {
  const { setOpenMenu } = useVisionContext()
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })
  const pathname = usePathname()

  const handlerCloseSidebar = () => {
    isTabletOrMobile && setOpenMenu(false)
  }

  return (
    <nav className={styled.navigation}>
      <Link
        href='/dash'
        className={pathname === "/dash" ? `${styled.active}` : ""}
        onClick={handlerCloseSidebar}
      >
        <FiHome />
        Inicio
      </Link>
      <Link
        href='/dash/trains'
        className={pathname === "/dash/trains" ? `${styled.active}` : ""}
        onClick={handlerCloseSidebar}
      >
        <FiGrid />
        Trilhas
      </Link>
      <Link
        href={`https://wa.me/${numberWhats}?text=${messageWhats}`}
        target='_blank'
        onClick={handlerCloseSidebar}
      >
        <FiHeadphones />
        Suporte
      </Link>
      <Link
        href='/dash/settings'
        className={pathname === "/dash/settings" ? `${styled.active}` : ""}
        onClick={handlerCloseSidebar}
      >
        <FiSettings />
        Configurações
      </Link>
    </nav>
  )
}

export default NavLinks

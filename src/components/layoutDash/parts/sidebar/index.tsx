'use client'
import { useVisionContext } from "@/context"
import { memo } from "react"
import { FiLogOut } from "react-icons/fi"
import ContentSearch from "./parts/contentSearch"
import NavLinks from "./parts/navLinks"
import styled from "./style.module.scss"

const SidebarPart = () => {
 const { openMenu } = useVisionContext()

 return (
  <aside className={`${styled.aside} ${openMenu && styled.active}`}>
   <header>
    <ContentSearch />
    <NavLinks />
   </header>
   <footer className={styled.footer}>
    <button className={styled.btnLogout}>
     <FiLogOut />
     Sair do Sistema
    </button>
   </footer>
  </aside>
 )
}

export default memo(SidebarPart)
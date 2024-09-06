import Link from "next/link"
import { memo } from "react"
import { FiCalendar, FiGrid, FiHeadphones, FiHome, FiLogOut, FiSearch, FiSettings } from "react-icons/fi"
import styled from "./style.module.scss"

const SidebarPart = () => {

 return (
  <aside className={styled.aside}>
   <header className={styled.header}>
    <article className={styled.contentSearch}>
     <FiSearch />
     <input placeholder="Busque por trilhas e ebooks" />
    </article>
    <nav className={styled.navigation}>
     <Link href="/dash"><FiHome />Inicio</Link>
     <Link href="/trains"><FiGrid />Trilhas</Link>
     <Link href="/meeting"><FiCalendar />Consultoria</Link>
     <Link href="/help"><FiHeadphones />Suporte</Link>
     <Link href="/settings"><FiSettings />Configurações</Link>
    </nav>
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
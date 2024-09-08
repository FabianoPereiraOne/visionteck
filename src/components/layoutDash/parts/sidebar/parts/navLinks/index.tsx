import Link from "next/link"
import { FiCalendar, FiGrid, FiHeadphones, FiHome, FiSettings } from "react-icons/fi"
import styled from "./style.module.scss"

const NavLinks = () => {
 return (
  <nav className={styled.navigation}>
   <Link href="/dash"><FiHome />Inicio</Link>
   <Link href="/trains"><FiGrid />Trilhas</Link>
   <Link href="/meeting"><FiCalendar />Consultoria</Link>
   <Link href="/help"><FiHeadphones />Suporte</Link>
   <Link href="/settings"><FiSettings />Configurações</Link>
  </nav>
 )
}

export default NavLinks
'use client'
import { useVisionContext } from "@/context"
import { fetchLogout } from "@/utils/fetch/logout/get"
import { useRouter } from "next/navigation"
import { memo, useState } from "react"
import toast from "react-hot-toast"
import { FiLogOut } from "react-icons/fi"
import BeatLoader from "react-spinners/BeatLoader"
import ContentSearch from "./parts/contentSearch"
import NavLinks from "./parts/navLinks"
import styled from "./style.module.scss"

const SidebarPart = () => {
 const { openMenu } = useVisionContext()
 const router = useRouter()
 const [loading, setLoading] = useState(false)

 const handlerLogout = async () => {
  setLoading(true)
  const result = await fetchLogout()
  const response = await result.json()

  if (!result.ok) {
   setLoading(false)
   return toast.error("Não foi possível fazer logout.")
  }

  setLoading(false)
  toast.success(response.success)
  return setTimeout(() => router.push('/login'), 1000)
 }

 return (
  <aside className={`${styled.aside} ${openMenu && styled.active}`}>
   <header>
    <ContentSearch />
    <NavLinks />
   </header>
   <footer className={styled.footer}>
    <button className={styled.btnLogout} onClick={handlerLogout}>
     <FiLogOut />
     {loading ? (
      <>
       Saindo
       <BeatLoader color="#F9F9F9" size={12} />
      </>
     ) : "Sair do Sistema"}
    </button>
   </footer>
  </aside>
 )
}

export default memo(SidebarPart)
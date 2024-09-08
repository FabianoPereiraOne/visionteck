import ButtonMenu from "@/components/ButtonMenu"
import { schemaAssets } from "@/schemas/others/assets"
import Link from "next/link"
import { FiGift, FiUser } from "react-icons/fi"
import styled from "./style.module.scss"

const HeaderPart = () => {
 return (
  <header className={styled.header}>
   <nav className={styled.navMenu}>
    <ButtonMenu />

    <figure className={styled.logo}>
     <Link href="/dash">
      <img src={schemaAssets.general.logo} alt="Vision Teck" />
     </Link>
    </figure>
   </nav>

   <nav className={styled.groupProfile}>
    <button>
     <FiGift />
    </button>
    <button>
     <FiUser />
    </button>
   </nav>
  </header>
 )
}

export default HeaderPart
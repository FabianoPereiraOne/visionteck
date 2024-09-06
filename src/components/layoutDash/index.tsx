import { memo, ReactNode } from "react"
import BodyPart from "./parts/body"
import HeaderPart from "./parts/header"
import MainContainer from "./parts/main"
import SidebarPart from "./parts/sidebar"

const LayoutDash = ({ children }: { children: ReactNode }) => {

 return (
  <>
   <HeaderPart />
   <MainContainer>
    <SidebarPart />
    <BodyPart>
     {children}
    </BodyPart>
   </MainContainer>
  </>
 )
}

export default memo(LayoutDash)
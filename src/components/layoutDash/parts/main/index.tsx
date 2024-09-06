import { memo, ReactNode } from "react"
import styled from "./style.module.scss"

const MainContainer = ({ children }: { children: ReactNode }) => {
 return (
  <main className={styled.main}>
   {children}
  </main>
 )
}

export default memo(MainContainer)
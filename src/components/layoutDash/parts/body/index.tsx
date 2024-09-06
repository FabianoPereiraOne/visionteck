import { memo, ReactNode } from "react"
import styled from "./style.module.scss"

const BodyPart = ({ children }: { children: ReactNode }) => {
 return (
  <section className={styled.section}>{children}</section>
 )
}

export default memo(BodyPart)
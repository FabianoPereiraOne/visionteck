"use server"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { ReactNode } from "react"
import styled from "./style.module.scss"

const HeaderBody = async ({
  title,
  btnAdmin,
  children
}: {
  title?: string
  btnAdmin: ReactNode
  children?: ReactNode
}) => {
  const { isAdmin } = await useVerifyAdmin()

  return (
    <div className={styled.container}>
      {title && <strong className={styled.title}>{title}</strong>}
      {children}
      {isAdmin && btnAdmin}
    </div>
  )
}

export default HeaderBody

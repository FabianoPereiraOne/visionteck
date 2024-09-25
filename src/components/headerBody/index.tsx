"use server"
import { dataUser } from "@/types/user"
import { ReactNode } from "react"
import styled from "./style.module.scss"

const HeaderBody = async ({
  enableUserTitle,
  btnAdmin,
  children,
  user,
  isAdmin
}: {
  enableUserTitle?: boolean
  btnAdmin: ReactNode
  children?: ReactNode
  user: dataUser
  isAdmin: boolean
}) => {
  const title = enableUserTitle && `👋 Olá, ${user && user?.name}`

  return (
    <div className={styled.container}>
      {title && <strong className={styled.title}>{title}</strong>}
      {isAdmin && children}
      {isAdmin && btnAdmin}
    </div>
  )
}

export default HeaderBody

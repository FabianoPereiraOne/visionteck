"use server"
import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import { ReactNode } from "react"
import styled from "./style.module.scss"

const HeaderBody = async ({
  enableUserTitle,
  btnAdmin,
  children
}: {
  enableUserTitle?: boolean
  btnAdmin: ReactNode
  children?: ReactNode
}) => {
  const auth = cookies().get(cookieAuth)?.value
  const user = await useReturnDecoded(auth)
  const title = enableUserTitle && `👋 Olá, ${user && user?.name}`

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

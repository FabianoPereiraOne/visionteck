import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import { memo } from "react"
import styled from "./style.module.scss"

const HeaderBody = async () => {
 const auth = cookies().get(cookieAuth)?.value
 const user = await useReturnDecoded(auth)

 return (
  <article className={styled.container}>
   <strong className={styled.title}>{"👋 Olá, "}{user && user?.name}</strong>
  </article>
 )
}

export default memo(HeaderBody)
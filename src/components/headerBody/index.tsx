import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import { memo } from "react"
import ButtonAds from "./parts/buttonAds"
import styled from "./style.module.scss"

const HeaderBody = async () => {
  const auth = cookies().get(cookieAuth)?.value
  const user = await useReturnDecoded(auth)
  const { isAdmin } = await useVerifyAdmin()

  return (
    <article className={styled.container}>
      <strong className={styled.title}>
        {"👋 Olá, "}
        {user && user?.name}
      </strong>
      {isAdmin && <ButtonAds />}
    </article>
  )
}

export default memo(HeaderBody)

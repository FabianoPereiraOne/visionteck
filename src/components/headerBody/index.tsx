import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import { memo } from "react"

const HeaderBody = async () => {
 const auth = cookies().get(cookieAuth)?.value
 const user = await useReturnDecoded(auth)

 return (
  <article>
   {user && user?.name}
  </article>
 )
}

export default memo(HeaderBody)
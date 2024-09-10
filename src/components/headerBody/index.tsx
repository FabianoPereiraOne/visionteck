'use client'
import { useVisionContext } from "@/context"
import { memo } from "react"

const HeaderBody = () => {
 const { user } = useVisionContext()

 return (
  <article>
   {user && user.name}
  </article>
 )
}

export default memo(HeaderBody)
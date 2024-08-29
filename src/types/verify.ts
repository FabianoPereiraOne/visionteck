import { ReactNode } from "react"

export type LoadingMsgProps = {
  message: string
  link?: { url: string; name: string }
  children?: ReactNode
}

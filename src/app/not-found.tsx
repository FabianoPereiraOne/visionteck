import MessageCenter from "@/components/messageCenter"
import { default404 } from "@/schemas/pages/verify-account"
import styled from "./error.module.scss"

const NotFound = () => {
  return (
    <section className={styled.container}>
      <MessageCenter defaultProps={default404} />
    </section>
  )
}

export default NotFound

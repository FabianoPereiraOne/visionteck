import MessageCenter from "@/components/messageCenter"
import { schemaAssets } from "@/schemas/others/assets"
import { Class } from "@/types/class"
import styled from "./style.module.scss"

const BodyClass = ({ classActive }: { classActive: Class | null }) => {
  if (!classActive)
    return (
      <MessageCenter
        defaultProps={{
          message: "Nenhuma aula para exibir no momento!",
          image: schemaAssets.general.empty
        }}
      />
    )

  return (
    <section className={styled.container}>
      <h1>hello body</h1>
    </section>
  )
}

export default BodyClass

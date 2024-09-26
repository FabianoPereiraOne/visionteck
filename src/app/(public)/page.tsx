import MessageCenter from "@/components/messageCenter"
import { schemaAssets } from "@/schemas/others/assets"
import styled from "./style.module.scss"

export default function Home() {
  return (
    <main className={styled.container}>
      <MessageCenter
        defaultProps={{
          message: `🚧 Estamos em construção! Em breve teremos novidades não deixe de nos acompanhar.`,
          link: { name: "Ir para Login", url: "/login" },
          image: schemaAssets.general.build
        }}
      />
    </main>
  )
}

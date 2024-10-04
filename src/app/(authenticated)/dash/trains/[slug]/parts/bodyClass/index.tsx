import MessageCenter from "@/components/messageCenter"
import { schemaAssets } from "@/schemas/others/assets"
import { Class } from "@/types/class"
import { ClassType } from "@prisma/client"
import { EbookComponent } from "./parts/ebookComponent"
import { VideoComponent } from "./parts/videoComponent"
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
      {classActive?.type === ClassType.EBOOK && (
        <EbookComponent classActive={classActive} />
      )}
      {classActive?.type === ClassType.VIDEO && (
        <VideoComponent classActive={classActive} />
      )}
    </section>
  )
}

export default BodyClass

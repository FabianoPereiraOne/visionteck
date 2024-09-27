"use server"
import MessageCenter from "@/components/messageCenter"
import { useVerifyArrayEmpty } from "@/hooks/useVerifyArrayEmpty"
import { schemaAssets } from "@/schemas/others/assets"
import { Collection } from "@/types/collection"
import { Train } from "@/types/train"
import { dataUser } from "@/types/user"
import { CollectionPart } from "./parts/collection"
import styled from "./style.module.scss"

export const ListingCollections = async ({
  user,
  listData,
  listTrains
}: {
  user: dataUser
  listData: Collection[]
  listTrains: Train[]
}) => {
  const collections = listData.filter(
    collection => collection?.trains?.length > 0
  )

  const { isEmpty } = useVerifyArrayEmpty()

  if (isEmpty(collections))
    return (
      <MessageCenter
        defaultProps={{
          message: "Nenhuma trilha disponível no momento!",
          image: schemaAssets.general.empty
        }}
      />
    )

  return (
    <section className={styled.container}>
      {collections.map(collection => {
        return (
          <CollectionPart
            user={user}
            key={collection?.id}
            data={collection}
            listTrains={listTrains}
          />
        )
      })}
    </section>
  )
}

"use server"
import { useVerifyArrayEmpty } from "@/hooks/useVerifyArrayEmpty"
import { Collection } from "@/types/collection"
import serverAPI from "@/utils/fetch/config"
import { CollectionPart } from "./parts/collection"
import styled from "./style.module.scss"

export const ListingCollections = async () => {
  const { getAll } = serverAPI()
  const result = await getAll({ route: "collections" })
  const response = await result?.json()
  const listData: Collection[] = response?.data
  const collections = listData.filter(
    collection => collection?.trains?.length > 0
  )

  const { isEmpty } = useVerifyArrayEmpty()

  if (isEmpty(collections)) return <>Not found</>

  return (
    <section className={styled.container}>
      {collections.map(collection => {
        return <CollectionPart key={collection?.id} data={collection} />
      })}
    </section>
  )
}

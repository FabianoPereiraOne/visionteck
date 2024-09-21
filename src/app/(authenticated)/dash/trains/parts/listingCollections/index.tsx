"use server"
import { useVerifyArrayEmpty } from "@/hooks/useVerifyArrayEmpty"
import { Collection } from "@/types/collection"
import { fetchAllCollections } from "@/utils/fetch/collections/getAll"
import { CollectionPart } from "./parts/collection"
import styled from "./style.module.scss"

export const ListingCollections = async () => {
  const result = await fetchAllCollections()
  const response = await result?.json()
  const listData: Collection[] = response?.data ?? []
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

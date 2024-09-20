import { useVerifyArrayEmpty } from "@/hooks/useVerifyArrayEmpty"
import { getAllCollections } from "@/services/prisma/collections/getAll"
import { CollectionPart } from "./parts/collection"
import styled from "./style.module.scss"

export const ListingCollections = async () => {
  const data = await getAllCollections()
  const collections = data?.filter(collection => collection?.trains?.length > 0)
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

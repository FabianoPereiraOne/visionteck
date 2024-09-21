import { Collection } from "@/types/collection"
import { HeaderPart } from "./parts/header"
import { ListingTrains } from "./parts/listingTrains"

export const CollectionPart = ({ data }: { data: Collection }) => {
  return (
    <>
      <HeaderPart
        id={data?.id}
        title={data?.title}
        themeColor={data?.themeColor}
      />
      <ListingTrains data={data?.trains} />
    </>
  )
}

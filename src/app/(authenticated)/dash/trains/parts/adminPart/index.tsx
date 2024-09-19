"use client"

import ButtonAdmin from "@/components/buttonAdmin"
import { layoutAddAds } from "@/layouts/ads/add"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const AdminPart = () => {
  const [update, setUpdate] = useState(false)
  const { register } = useForm()

  return (
    <ButtonAdmin
      update={update}
      title='Trilhas'
      layout={layoutAddAds({ register, preview: "" })}
      fcUpdate={() => {}}
      fcSubmit={() => {}}
      fcDelete={() => {}}
      fcGetData={async () => {
        const result = await fetch("/api/ads", {
          method: "GET"
        })

        return result
      }}
      fcLoadSetValues={() => {}}
    />
  )
}

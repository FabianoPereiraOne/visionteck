"use client"
import LoadingMessageCenter from "@/components/loadingMessageCenter"
import { defaultError, defaultLoading } from "@/schemas/pages/verify-account"
import { searchParamsProps } from "@/types/general"
import { verifyAccount } from "@/utils/fetch/verify/get"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const VerifyAccount = ({ searchParams }: { searchParams: searchParamsProps }) => {
 const id = searchParams?.id
 const token = searchParams?.token
 const router = useRouter()
 const [error, setError] = useState(false)

 if (!id || !token) return router.push('/login')


 const loadVerifyToken = async () => {
  const result = await verifyAccount({ id, token })

  if (!result.ok) return setError(true)

  router.push('/dash')
 }

 useEffect(() => {
  loadVerifyToken()
 }, [])

 return (
  <LoadingMessageCenter defaultProps={!error ? defaultLoading : defaultError} />
 )
}

export default VerifyAccount



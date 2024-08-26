import ErrorComponent from "@/components/ErrorComponent"
import { searchParamsProps } from "@/types/general"
import { verifyAccount } from "@/utils/fetch/verify/get"
import { redirect } from "next/navigation"

const VerifyAccount = async ({ searchParams }: { searchParams: searchParamsProps }) => {
 const id = searchParams?.id
 const token = searchParams?.token

 if (!id || !token) return redirect('/login')

 const result = await verifyAccount({ id, token })

 if (!result.ok) return <ErrorComponent message={`Não foi possível verificar sua conta no momento!
  \n Por favor, tente novamente mais tarde.`} link={{ name: "Voltar para home", url: "/" }} />

 redirect("/dash")
}

export default VerifyAccount
import { getUser } from "@/services/prisma/users/get"
import { updateUser } from "@/services/prisma/users/update"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = await new URL(request.url)
  const params = {
    id: searchParams.get("id"),
    token: searchParams.get("token")
  }

  const isNotValidParams = Object.values(params).includes(null)

  if (isNotValidParams)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID e Token são obrigatórios."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const user = await getUser({ id: params.id! })

    if (!user)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Usuário não está registrado no sistema."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const hasTokenValid = user.verificationToken === params.token!

    if (!hasTokenValid)
      return NextResponse.json(
        {
          statusCode: httpStatus.invalidRequest.statusCode,
          error: "Token enviado é invalido."
        },
        {
          status: httpStatus.invalidRequest.statusCode
        }
      )

    const data = await updateUser({
      id: params.id!,
      emailVerified: true
    })

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Conta verificada com sucesso."
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}

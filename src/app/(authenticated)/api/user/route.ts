import { useVerifyUser } from "@/hooks/useVerifyUser"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { isUser, data } = await useVerifyUser(request)
  if (!isUser)
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: "Faça login no sistema."
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )

  try {
    if (!data) {
      return NextResponse.json(
        {
          statusCode: httpStatus.invalidRequest.statusCode,
          error: "Token enviado é invalido."
        },
        {
          status: httpStatus.invalidRequest.statusCode
        }
      )
    }

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Dados retornados com sucesso."
      },
      {
        status: 200
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}

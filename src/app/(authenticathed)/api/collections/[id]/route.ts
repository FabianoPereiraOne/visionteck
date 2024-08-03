import { useParseNumber } from "@/hooks/useParseNumber"
import { getCollection } from "@/services/prisma/colletions/get"
import { paramsProps } from "@/types/general"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: paramsProps }
) {
  const { id } = params

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID da Coleção obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    console.log(useParseNumber(id))
    const data = await getCollection({ id: useParseNumber(id) })

    if (!data)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Coleção não encontrada."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: httpStatus.ok.success
      },
      {
        status: httpStatus.ok.statusCode
      }
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

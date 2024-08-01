import { getUser } from "@/services/prisma/users/get"
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
        error: httpStatus.invalidRequest.error
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const data = await getUser({ id })

    if (!data)
      return NextResponse.json(
        {
          statusCode: httpStatus.invalidRequest.statusCode,
          error: "Usuário não está registrado no sistema."
        },
        {
          status: httpStatus.invalidRequest.statusCode
        }
      )

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data: { ...data, password: "********" },
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
